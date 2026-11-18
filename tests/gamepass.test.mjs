import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { entitled, validLevel } from '../server/gamepass/worker.js';
const subscription = (status, price = 'monthly') => ({ status, items: { data: [{ price: { id: price } }] } });
test('only active subscriptions for Game Pass prices unlock levels', () => {
  assert.equal(entitled([subscription('active')], ['monthly','annual']), true);
  for (const state of ['past_due','unpaid','incomplete','canceled','paused','trialing']) assert.equal(entitled([subscription(state)], ['monthly']), false);
  assert.equal(entitled([subscription('active','other-product')], ['monthly']), false);
});
test('level IDs reject invalid inputs', () => {
  for (const value of [0,-1,1.5,'1',null,1000]) assert.equal(validLevel(value), false);
  assert.equal(validLevel(1), true);
});
const env = { ALLOWED_ORIGINS: 'https://pengamepublishing.com', GAME_CATALOG: '[{"id":"test","levels":2,"launchUrl":"https://example.com"}]', LEVELS: { get: async () => ({ body: 'free', writeHttpMetadata: h => h.set('Content-Type','text/plain') }) } };
test('level one loads without authentication', async () => { const res = await worker.fetch(new Request('https://api.example.com/level/test/1/map.json'),env); assert.equal(res.status,200); assert.equal(await res.text(),'free'); });
test('paid assets fail closed without backend configuration', async () => { const res = await worker.fetch(new Request('https://api.example.com/level/test/2/map.json'),env); assert.equal(res.status,503); });
test('unlisted origins denied and sales disabled by default', async () => {
  assert.equal((await worker.fetch(new Request('https://api.example.com/catalog',{headers:{Origin:'https://evil.example'}}),env)).status,403);
  const res = await worker.fetch(new Request('https://api.example.com/catalog'),env); assert.equal((await res.json()).salesEnabled,false);
});
test('invalid or unconfigured levels are rejected', async () => { for(const path of ['/level/test/0/map.json','/level/test/3/map.json','/level/other/1/map.json']) assert.equal((await worker.fetch(new Request('https://api.example.com'+path),env)).status,404); });
