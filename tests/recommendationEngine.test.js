import assert from 'node:assert';
import test from 'node:test';
import { recommendMovies } from '../src/utils/recommendationEngine.ts';

const catalog = [
  { id: 'm1', title: 'SciFi Odyssey', genres: ['Sci-Fi', 'Adventure'], rating: 8.5 },
  { id: 'm2', title: 'Space Voyage', genres: ['Sci-Fi'], rating: 7.8 },
  { id: 'm3', title: 'Romantic Comedy', genres: ['Romance', 'Comedy'], rating: 6.5 },
  { id: 'm4', title: 'Deep Ocean', genres: ['Documentary'], rating: 9.0 },
];

test('recommendMovies: prioritizes genres matching user watch history', () => {
  const watchHistory = [
    { id: 'm0', title: 'Interstellar Voyage', genres: ['Sci-Fi'], rating: 9.0 },
  ];

  const recommendations = recommendMovies(catalog, watchHistory, 2);
  assert.strictEqual(recommendations.length, 2);
  // Sci-Fi titles should rank first
  assert.strictEqual(recommendations[0].movie.id, 'm1');
  assert.strictEqual(recommendations[1].movie.id, 'm2');
  assert.ok(recommendations[0].matchScore >= recommendations[1].matchScore);
});

test('recommendMovies: fallback to highest rated when no history', () => {
  const recs = recommendMovies(catalog, [], 2);
  assert.strictEqual(recs.length, 2);
  assert.strictEqual(recs[0].movie.title, 'Deep Ocean'); // Rating 9.0
  assert.strictEqual(recs[1].movie.title, 'SciFi Odyssey'); // Rating 8.5
});

test('recommendMovies: excludes already watched movies', () => {
  const recs = recommendMovies(catalog, [catalog[0]], 3);
  const ids = recs.map((r) => r.movie.id);
  assert.ok(!ids.includes('m1'));
});
