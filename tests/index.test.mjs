import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('classic fixture', () => {
  assert.equal(api.encodeRailFence('WEAREDISCOVEREDFLEEATONCE', 3), 'WECRLTEERDSOEEFEAOCAIVDEN');
});
test('inverse classic', () => {
  assert.equal(api.decodeRailFence('WECRLTEERDSOEEFEAOCAIVDEN', 3), 'WEAREDISCOVEREDFLEEATONCE');
});
test('Unicode and spaces', () => {
  const t = 'A 😀 B é';
  assert.equal(api.decodeRailFence(api.encodeRailFence(t, 3), 3), t);
});
test('all rails', () => {
  for (let r = 2; r <= 30; r++) {
    const t = '0123456789abcdef';
    assert.equal(api.decodeRailFence(api.encodeRailFence(t, r), r), t);
  }
});
test('empty and short', () => {
  assert.equal(api.encodeRailFence('', 2), '');
  assert.equal(api.encodeRailFence('AB', 256), 'AB');
});
test('invalid arguments', () => {
  assert.throws(() => api.encodeRailFence('a', 1));
  assert.throws(() => api.decodeRailFence('a', 257));
  assert.throws(() => api.encodeRailFence('\ud800', 3));
});
