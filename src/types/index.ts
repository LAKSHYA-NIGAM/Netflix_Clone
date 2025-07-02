export interface Movie {
  id: string;
  title: string;
  description: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  runtime?: number;
  video_url?: string;
  trailer_url?: string;
  type: 'movie' | 'tv';
}

export interface Genre {
  id: number;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  myList: string[];
  continueWatching: {
    movieId: string;
    progress: number;
    lastWatched: string;
  }[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}