import test from 'node:test';
import assert from 'node:assert/strict';
import { GAMES } from '../src/data/games.js';
import { TIERS, access, checkBirthDate, gateAge, launchUrl, needsWarning, readMeets, saveMeets, clearMeets, tierForAge } from '../src/lib/ageRatings.js';

const today = new Date(2026, 10, 21);
const memory = () => { const m = new Map(); return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k), dump: () => [...m.values()].join('') }; };

test('every game has a valid rating and descriptor list', () => {
  for (const g of GAMES) {
    assert.ok(TIERS[g.rating], `${g.id} has rating ${g.rating}`);
    assert.ok(Array.isArray(g.descriptors), `${g.id} lists descriptors`);
  }
});

test('the free game is open to everyone without an age check', () => {
  const free = GAMES.find(g => g.free);
  assert.equal(access(free, null).state, 'play');
});

test('birth dates map to the right tier on a birthday boundary', () => {
  assert.equal(checkBirthDate({ year: 2013, month: 11, day: 21 }, today).meets, 13);
  assert.equal(checkBirthDate({ year: 2013, month: 11, day: 22 }, today).meets, 10);
  assert.equal(checkBirthDate({ year: 2008, month: 11, day: 21 }, today).meets, 18);
  assert.equal(checkBirthDate({ year: 2009, month: 1, day: 1 }, today).meets, 17);
  assert.equal(tierForAge(9), 0);
});

test('impossible or future dates are rejected', () => {
  for (const d of [{ year: 2010, month: 2, day: 30 }, { year: 2030, month: 1, day: 1 }, { year: '', month: 1, day: 1 }, { year: 1850, month: 1, day: 1 }]) assert.ok(checkBirthDate(d, today).error);
});

test('mature games ask first, then lock or open by age', () => {
  const atl = GAMES.find(g => g.id === 'atl-nightclub-mogul');
  const after = GAMES.find(g => g.id === 'about-last-night');
  assert.equal(access(atl, null).state, 'ask');
  assert.equal(access(atl, 17).state, 'locked');
  assert.equal(access(atl, 18).state, 'play');
  assert.equal(access(after, 13).state, 'locked');
  assert.equal(access(after, 17).state, 'play');
});

test('under-13s are kept out of games whose online community is still on', () => {
  const chatty = { id: 'chatty', rating: 'all', kidSafe: false };
  assert.equal(gateAge(chatty), 13);
  assert.equal(access(chatty, 10).state, 'locked');
  assert.equal(access(chatty, 10).reason, 'online');
  assert.equal(access(chatty, 13).state, 'play');
});

test('Coloring Odyssey asks first, then opens in kid mode for under-13s', () => {
  const coloring = GAMES.find(g => g.id === 'coloring-odyssey');
  assert.equal(access(coloring, null).state, 'ask');
  assert.equal(access(coloring, 0).state, 'play');
  assert.equal(launchUrl(coloring.url, 10), 'https://mrimagemakers.github.io/Coloring-Odyssey/?pg_mode=kid');
  assert.equal(launchUrl(coloring.url, 18), coloring.url);
});

test('minors get a mode flag only on PenGame links', () => {
  assert.equal(launchUrl('https://mrimagemakers.github.io/NiasVRWorld/', 10), 'https://mrimagemakers.github.io/NiasVRWorld/?pg_mode=kid');
  assert.equal(launchUrl('https://turnupmusic.online', 15), 'https://turnupmusic.online/?pg_mode=teen');
  assert.equal(launchUrl('https://horizon.meta.com/world/1/', 10), 'https://horizon.meta.com/world/1/');
  assert.equal(launchUrl('https://mrimagemakers.github.io/x/', 18), 'https://mrimagemakers.github.io/x/');
});

test('content notices cover 13+ games and motion warnings', () => {
  assert.equal(needsWarning(GAMES.find(g => g.id === 'porch-war')), true);
  assert.equal(needsWarning(GAMES.find(g => g.id === 'world-of-coasters')), true);
  assert.equal(needsWarning(GAMES.find(g => g.id === 'queen-of-the-seas')), false);
});

test('only the tier is stored, never the birth date', () => {
  const s = memory();
  const { meets } = checkBirthDate({ year: 2014, month: 6, day: 15 }, today);
  saveMeets(meets, s);
  assert.equal(readMeets(s), 10);
  assert.ok(!s.dump().includes("2014"));
  clearMeets(s);
  assert.equal(readMeets(s), null);
  s.setItem('pengame-age-check-v1', '{"meets":99}');
  assert.equal(readMeets(s), null);
});
