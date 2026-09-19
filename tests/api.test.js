import test from 'node:test';
import assert from 'node:assert/strict';
import { getShows } from '../src/api.js';

test('browse keeps the selected page and passes the abort signal', async t => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.tvmaze.com/shows?page=2');
    assert.equal(options.signal, controller.signal);
    return { ok: true, json: async () => [{ id: 501, name: 'Example' }] };
  });
  assert.deepEqual(await getShows('', 2, controller.signal), [{ id: 501, name: 'Example' }]);
});

test('search encodes special characters and unwraps search results', async t => {
  t.mock.method(globalThis, 'fetch', async url => {
    assert.equal(url, 'https://api.tvmaze.com/search/shows?q=Law%20%26%20Order');
    return { ok: true, json: async () => [{ score: 1, show: { id: 1, name: 'Law & Order' } }] };
  });
  assert.deepEqual(await getShows('Law & Order', 0), [{ id: 1, name: 'Law & Order' }]);
});

test('the end of the browse index is an empty page', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 404 }));
  assert.deepEqual(await getShows('', 99999), []);
  await assert.rejects(getShows('missing', 0), /Could not load/);
});

test('rate limits and server failures show useful errors', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 429 }));
  await assert.rejects(getShows('', 0), /Too many requests/);
  fetchMock.mock.mockImplementation(async () => ({ ok: false, status: 500 }));
  await assert.rejects(getShows('', 0), /Could not load/);
});

test('aborted requests remain recognizable to the calling page', async t => {
  t.mock.method(globalThis, 'fetch', async () => { throw new DOMException('Aborted', 'AbortError'); });
  await assert.rejects(getShows('girls', 0), { name: 'AbortError' });
});
