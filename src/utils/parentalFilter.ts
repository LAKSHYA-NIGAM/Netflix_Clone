/**
 * Netflix Parental Guidance & Content Maturity Filter
 * Filters content by maturity rating tiers (G, PG, PG-13, R, NC-17 / TV-Y, TV-G, TV-PG, TV-14, TV-MA).
 */

export const RATING_LEVELS: Record<string, number> = {
  g: 1,
  'tv-y': 1,
  'tv-g': 1,
  pg: 2,
  'tv-pg': 2,
  'pg-13': 3,
  'tv-14': 3,
  r: 4,
  'tv-ma': 4,
  'nc-17': 5,
};

export function isContentAllowed(contentRating: string, maxAllowedRating: string): boolean {
  const normContent = (contentRating || 'tv-ma').trim().toLowerCase();
  const normAllowed = (maxAllowedRating || 'tv-ma').trim().toLowerCase();

  const contentRank = RATING_LEVELS[normContent] || 4;
  const allowedRank = RATING_LEVELS[normAllowed] || 4;

  return contentRank <= allowedRank;
}

export function filterCatalogByMaturity(catalog: Array<{ id: string; ratingTier?: string }>, maxRating: string) {
  if (!Array.isArray(catalog)) return [];
  return catalog.filter((item) => isContentAllowed(item.ratingTier || 'tv-g', maxRating));
}
