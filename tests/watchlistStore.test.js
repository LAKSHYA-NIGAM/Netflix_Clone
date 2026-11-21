import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { WatchlistStore } from '../src/utils/watchlistStore.ts';

describe('WatchlistStore Unit Tests', () => {
  let store;

  beforeEach(() => {
    store = new WatchlistStore();
  });

  test('adds and retrieves movies without duplicates', () => {
    const movie1 = { id: 'm1', title: 'Inception', genre: 'Sci-Fi', rating: 8.8 };
    const added1 = store.add(movie1);
    assert.equal(added1, true);
    assert.equal(store.count(), 1);

    // Duplicate add returns false and does not inflate count
    const addedAgain = store.add(movie1);
    assert.equal(addedAgain, false);
    assert.equal(store.count(), 1);
  });

  test('removes and toggles movies properly', () => {
    const movie = { id: 'm2', title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6 };
    assert.equal(store.toggle(movie), true); // added
    assert.equal(store.has('m2'), true);

    assert.equal(store.toggle(movie), false); // removed
    assert.equal(store.has('m2'), false);
    assert.equal(store.count(), 0);
  });

  test('filters by genre and sorts by rating descending', () => {
    store.add({ id: 'm1', title: 'The Dark Knight', genre: 'Action', rating: 9.0 });
    store.add({ id: 'm2', title: 'Die Hard', genre: 'Action', rating: 8.2 });
    store.add({ id: 'm3', title: 'The Hangover', genre: 'Comedy', rating: 7.7 });

    const actionOnly = store.filterAndSort({ genre: 'Action', sortBy: 'rating_desc' });
    assert.equal(actionOnly.length, 2);
    assert.equal(actionOnly[0].id, 'm1');
    assert.equal(actionOnly[1].id, 'm2');

    const highRated = store.filterAndSort({ minRating: 8.5 });
    assert.equal(highRated.length, 1);
    assert.equal(highRated[0].title, 'The Dark Knight');
  });
});
