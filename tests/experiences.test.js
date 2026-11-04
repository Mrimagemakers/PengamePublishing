import test from 'node:test';
import assert from 'node:assert/strict';
import { GAMES, VENTURES, resolveBookCode } from '../src/lib/experiences.js';
import { BOOKS } from '../src/lib/booksData.js';

test('companion accepts catalog codes on both root and Pages deployments', () => {
  for (const path of ['/book-experiences', '/PengamePublishing/book-experiences']) {
    for (const book of BOOKS) {
      const url = `https://example.com${path}?book=${encodeURIComponent(book.id)}`;
      assert.equal(resolveBookCode(url, 'https://example.com', path, BOOKS)?.id, book.id);
    }
  }
});
test('scanner rejects foreign, malformed, unrelated, and unknown QR links', () => {
  for (const code of ['javascript:alert(1)', 'not a url', 'https://evil.example/book-experiences?book=changing-the-channel', 'https://example.com/other?book=changing-the-channel', 'https://example.com/book-experiences?book=unknown']) {
    assert.equal(resolveBookCode(code, 'https://example.com', '/book-experiences', BOOKS), null);
  }
});
test('portal includes all six destinations and corrected case-sensitive Success Brand URL', () => {
  assert.equal(GAMES.length, 6);
  assert.equal(new Set(GAMES.map(g => g.url)).size, 6);
  assert.equal(GAMES.find(g => g.name === 'Success Brand VR').url, 'https://mrimagemakers.github.io/SuccessBrandVR/');
  assert.ok(VENTURES.some(v => v[0] === 'PenGame Prison Book Program' && v[2].endsWith('/prison-publishing-program')));
});
