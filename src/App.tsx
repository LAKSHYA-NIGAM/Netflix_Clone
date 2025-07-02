import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import VideoPlayer from './components/VideoPlayer';
import AuthModal from './components/AuthModal';
import LoadingSpinner from './components/LoadingSpinner';
import { Movie } from './types';
import { featuredMovie, moviesByGenre, mockMovies } from './utils/mockData';

function App() {
  const [currentVideo, setCurrentVideo] = useState<Movie | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter movies based on search query
  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) {
      return moviesByGenre;
    }

    const query = searchQuery.toLowerCase();
    const filtered = mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    );

    return {
      searchResults: filtered,
      trending: [],
      drama: [],
      crime: [],
      sciFi: [],
      thriller: []
    };
  }, [searchQuery]);

  const handlePlay = (movie: Movie) => {
    setCurrentVideo(movie);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-netflix-black">
        <Header onSearch={handleSearch} onShowAuth={handleShowAuth} />
        
        <main>
          {!searchQuery && (
            <Hero movie={featuredMovie} onPlay={handlePlay} />
          )}
          
          <div className={`${!searchQuery ? 'pt-0' : 'pt-24'} pb-16 space-y-8`}>
            {searchQuery ? (
              // Search Results
              filteredMovies.searchResults.length > 0 ? (
                <MovieRow
                  title={`Search Results for "${searchQuery}"`}
                  movies={filteredMovies.searchResults}
                  onPlay={handlePlay}
                />
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-white text-2xl mb-4">No results found</h2>
                  <p className="text-gray-400">
                    Try searching for a different title
                  </p>
                </div>
              )
            ) : (
              // Regular Content Rows
              <>
                <MovieRow
                  title="Trending Now"
                  movies={filteredMovies.trending}
                  onPlay={handlePlay}
                />
                <MovieRow
                  title="Drama Series"
                  movies={filteredMovies.drama}
                  onPlay={handlePlay}
                />
                <MovieRow
                  title="Crime Thrillers"
                  movies={filteredMovies.crime}
                  onPlay={handlePlay}
                />
                <MovieRow
                  title="Sci-Fi & Fantasy"
                  movies={filteredMovies.sciFi}
                  onPlay={handlePlay}
                />
                <MovieRow
                  title="Psychological Thrillers"
                  movies={filteredMovies.thriller}
                  onPlay={handlePlay}
                />
              </>
            )}
          </div>
        </main>

        {/* Modals */}
        {currentVideo && (
          <VideoPlayer movie={currentVideo} onClose={handleCloseVideo} />
        )}

        {showAuth && (
          <AuthModal onClose={handleCloseAuth} />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;