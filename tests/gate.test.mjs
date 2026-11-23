import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { signToken, checkToken, ownedItems } from '../server/gamepass/worker.js';

const SECRET = 'test-secret';
const env = { ALLOWED_ORIGINS: 'https://pengamepublishing.com,https://mrimagemakers.github.io', GATE_SECRET: SECRET, STRIPE_SECRET_KEY: 'sk', SUPABASE_URL: 'https://x.supabase.co', SUPABASE_ANON_KEY: 'anon' };
const post = (path, body, origin = 'https://mrimagemakers.github.io') =>
  worker.fetch(new Request('https://api.example.com' + path, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) }), env);

test('play tokens only open the item they were issued for, until they expire', async () => {
  const now = Date.UTC(2026, 10, 23);
  const token = await signToken(SECRET, 'porch-war', now);
  assert.equal(await checkToken(SECRET, 'porch-war', token, now), true);
  assert.equal(await checkToken(SECRET, 'cruising-usa', token, now), false);
  assert.equal(await checkToken('other-secret', 'porch-war', token, now), false);
  assert.equal(await checkToken(SECRET, 'porch-war', token, now + 25 * 3600 * 1000), false);
  assert.equal(await checkToken(SECRET, 'porch-war', token.replace(/.$/, c => (c === 'A' ? 'B' : 'A')), now), false);
  for (const bad of [undefined, '', 'porch-war', 'porch-war.1.x', 'x'.repeat(400)]) assert.equal(await checkToken(SECRET, 'porch-war', bad, now), false);
});

test('only paid, completed checkouts count as owned', () => {
  const line = (price) => ({ data: [{ price: { id: price } }] });
  const sessions = [
    { status: 'complete', payment_status: 'paid', line_items: line('price_1UepaiFYqbWqjN88mAYQ23Dk') },        // Porch War
    { status: 'complete', payment_status: 'unpaid', line_items: line('price_1UepaTFYqbWqjN887fKvAPQR') },      // Coasters, unpaid
    { status: 'expired', payment_status: 'paid', line_items: line('price_1UepaVFYqbWqjN88Y16puD3L') },         // Cruising, expired
    { status: 'complete', payment_status: 'paid', line_items: line('price_unknown') },
    { status: 'complete', payment_status: 'paid', line_items: line('price_1UepT1FYqbWqjN88YvJSyblR') },        // Changing the Channel
  ];
  assert.deepEqual(ownedItems(sessions).sort(), ['changing-the-channel', 'porch-war']);
});

test('the game origin may call /verify; a real token verifies and a forged one does not', async () => {
  const token = await signToken(SECRET, 'porch-war');
  assert.equal((await (await post('/verify', { item: 'porch-war', token })).json()).ok, true);
  assert.equal((await (await post('/verify', { item: 'porch-war', token: 'porch-war.9999999999.forged' })).json()).ok, false);
  assert.equal((await post('/verify', { item: 'not-a-game', token })).status, 404);
  assert.equal((await post('/verify', { item: 'porch-war', token }, 'https://evil.example')).status, 403);
});

test('the gate stays closed until the server is configured, and /access requires sign-in', async () => {
  const bare = { ALLOWED_ORIGINS: env.ALLOWED_ORIGINS };
  assert.equal((await (await worker.fetch(new Request('https://api.example.com/status'), bare)).json()).ready, false);
  assert.equal((await worker.fetch(new Request('https://api.example.com/access?item=porch-war'), bare)).status, 503);
  assert.equal((await worker.fetch(new Request('https://api.example.com/access?item=porch-war'), env)).status, 401);
});
