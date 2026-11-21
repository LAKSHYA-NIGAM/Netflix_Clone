import assert from 'node:assert';
import test from 'node:test';
import { isContentAllowed, filterCatalogByMaturity } from '../src/utils/parentalFilter.ts';

test('isContentAllowed: blocks R-rated content on PG-13 or PG settings', () => {
  assert.strictEqual(isContentAllowed('R', 'PG-13'), false);
  assert.strictEqual(isContentAllowed('TV-MA', 'TV-PG'), false);
  assert.strictEqual(isContentAllowed('PG', 'PG-13'), true);
  assert.strictEqual(isContentAllowed('G', 'R'), true);
});

test('filterCatalogByMaturity: filters items based on max allowed maturity rating', () => {
  const items = [
    { id: '1', title: 'Kids Show', ratingTier: 'TV-Y' },
    { id: '2', title: 'Family Movie', ratingTier: 'PG' },
    { id: '3', title: 'Teen Thriller', ratingTier: 'PG-13' },
    { id: '4', title: 'Adult Drama', ratingTier: 'TV-MA' },
  ];

  const kidsOnly = filterCatalogByMaturity(items, 'TV-Y');
  assert.strictEqual(kidsOnly.length, 1);
  assert.strictEqual(kidsOnly[0].id, '1');

  const teenSafe = filterCatalogByMaturity(items, 'PG-13');
  assert.strictEqual(teenSafe.length, 3);
});
