import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

// Import movie data and genres
import { mockMovies, genres, featuredMovie, moviesByGenre } from '../src/utils/mockData.ts';

describe('Netflix Clone - Catalog Data Integrity and Filtering', () => {
  test('genres definition contains 18 valid unique categories', () => {
    assert.equal(genres.length, 18);
    const ids = new Set(genres.map(g => g.id));
    assert.equal(ids.size, 18, 'All genre IDs must be unique');
    genres.forEach(genre => {
      assert.ok(genre.id > 0);
      assert.ok(typeof genre.name === 'string' && genre.name.length > 0);
    });
  });

  test('mockMovies collection contains valid movie records', () => {
    assert.equal(mockMovies.length, 8);
    mockMovies.forEach(movie => {
      assert.ok(movie.id, 'Movie must have an ID');
      assert.ok(movie.title, 'Movie must have a title');
      assert.ok(movie.description, 'Movie must have a description');
      assert.ok(movie.vote_average >= 0 && movie.vote_average <= 10, 'Vote average must be between 0 and 10');
      assert.ok(Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0, 'Must have at least one genre');
      assert.ok(movie.poster_path.startsWith('http'), 'Poster must be a valid URL');
    });
  });

  test('featuredMovie is defined and matches the top trending title', () => {
    assert.ok(featuredMovie);
    assert.equal(featuredMovie.id, mockMovies[0].id);
    assert.equal(featuredMovie.title, 'Stranger Things');
  });

  test('moviesByGenre categorizes movies accurately', () => {
    assert.equal(moviesByGenre.trending.length, 6);

    // Drama (genre id 18)
    moviesByGenre.drama.forEach(m => {
      assert.ok(m.genre_ids.includes(18), `${m.title} must include drama genre id 18`);
    });

    // Crime (genre id 80)
    moviesByGenre.crime.forEach(m => {
      assert.ok(m.genre_ids.includes(80), `${m.title} must include crime genre id 80`);
    });

    // SciFi (genre id 878)
    moviesByGenre.sciFi.forEach(m => {
      assert.ok(m.genre_ids.includes(878), `${m.title} must include sci-fi genre id 878`);
    });

    // Thriller (genre id 53)
    moviesByGenre.thriller.forEach(m => {
      assert.ok(m.genre_ids.includes(53), `${m.title} must include thriller genre id 53`);
    });
  });

  test('search filtering accurately finds movies by query', () => {
    const search = (query) => {
      const q = query.toLowerCase().trim();
      return mockMovies.filter(m =>
        m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
      );
    };

    assert.equal(search('Stranger').length, 1);
    assert.equal(search('money').length, 2); // Money Heist and Ozark (launder money)
    assert.equal(search('chess').length, 1); // Queen's Gambit
    assert.equal(search('nonexistent_title_xyz').length, 0);
  });
});
