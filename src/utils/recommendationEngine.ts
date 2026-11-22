/**
 * Netflix Content Recommendation Engine
 * Computes match affinity score based on watched genres, ratings, and catalog metadata.
 */

export interface MovieItem {
  id: string;
  title: string;
  genres: string[];
  rating: number; // 0 - 10
}

export function recommendMovies(
  catalog: MovieItem[],
  watchHistory: MovieItem[],
  limit: number = 5
): Array<{ movie: MovieItem; matchScore: number }> {
  if (!Array.isArray(catalog) || catalog.length === 0) return [];
  if (!Array.isArray(watchHistory) || watchHistory.length === 0) {
    // Fallback: return top rated in catalog
    return [...catalog]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map((movie) => ({ movie, matchScore: Math.round(movie.rating * 10) }));
  }

  // Calculate user genre preferences from watch history
  const genreWeights: Record<string, number> = {};
  for (const watched of watchHistory) {
    for (const g of watched.genres || []) {
      const genre = g.toLowerCase();
      genreWeights[genre] = (genreWeights[genre] || 0) + 1;
    }
  }

  const watchedIds = new Set(watchHistory.map((m) => m.id));

  // Score unviewed catalog items
  const scored = catalog
    .filter((movie) => !watchedIds.has(movie.id))
    .map((movie) => {
      let genreScore = 0;
      for (const g of movie.genres || []) {
        genreScore += genreWeights[g.toLowerCase()] || 0;
      }
      // Composite score: 60% genre affinity + 40% rating
      const normalizedGenre = Math.min(10, genreScore * 2);
      const composite = Math.round((normalizedGenre * 0.6 + movie.rating * 0.4) * 10);
      return { movie, matchScore: Math.min(99, Math.max(50, composite)) };
    });

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
}
