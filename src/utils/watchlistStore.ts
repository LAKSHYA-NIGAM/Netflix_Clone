/**
 * User Watchlist & Favorites Store
 * Manages movie bookmarking, deduplication, and collection filtering.
 */

export interface WatchlistMovie {
  id: string;
  title: string;
  genre: string;
  rating: number;
  addedAt: number;
}

export class WatchlistStore {
  private items: Map<string, WatchlistMovie> = new Map();

  /**
   * Adds movie to watchlist.
   * Returns true if added, false if already present.
   */
  add(movie: Omit<WatchlistMovie, 'addedAt'>): boolean {
    if (!movie || !movie.id) return false;
    if (this.items.has(movie.id)) return false;

    this.items.set(movie.id, {
      ...movie,
      addedAt: Date.now()
    });
    return true;
  }

  /**
   * Removes movie by ID.
   */
  remove(id: string): boolean {
    return this.items.delete(id);
  }

  /**
   * Toggles movie presence in watchlist.
   */
  toggle(movie: Omit<WatchlistMovie, 'addedAt'>): boolean {
    if (this.items.has(movie.id)) {
      this.remove(movie.id);
      return false; // Removed
    }
    this.add(movie);
    return true; // Added
  }

  has(id: string): boolean {
    return this.items.has(id);
  }

  count(): number {
    return this.items.size;
  }

  getAll(): WatchlistMovie[] {
    return Array.from(this.items.values());
  }

  /**
   * Filters and sorts watchlist items.
   */
  filterAndSort(options: {
    genre?: string;
    minRating?: number;
    sortBy?: 'recently_added' | 'rating_desc' | 'title_asc';
  } = {}): WatchlistMovie[] {
    let list = this.getAll();

    if (options.genre && options.genre !== 'All') {
      list = list.filter(m => m.genre.toLowerCase() === options.genre!.toLowerCase());
    }

    if (options.minRating !== undefined) {
      list = list.filter(m => m.rating >= options.minRating!);
    }

    const sort = options.sortBy || 'recently_added';
    if (sort === 'rating_desc') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'title_asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => b.addedAt - a.addedAt);
    }

    return list;
  }

  clear(): void {
    this.items.clear();
  }
}
