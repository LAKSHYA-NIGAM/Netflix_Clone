import React from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  const { user, addToMyList, removeFromMyList } = useAuth();
  const isInMyList = user?.myList.includes(movie.id) || false;

  const handleMyListToggle = () => {
    if (isInMyList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {movie.title}
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 leading-relaxed opacity-90">
          {movie.description}
        </p>

        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2 text-white">
            <span className="bg-yellow-500 text-black px-2 py-1 text-sm font-bold rounded">
              ★ {movie.vote_average}
            </span>
            <span className="text-gray-300">{movie.release_date.split('-')[0]}</span>
            {movie.runtime && (
              <span className="text-gray-300">{movie.runtime}m</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors font-semibold"
          >
            <Play size={20} fill="currentColor" />
            <span>Play</span>
          </button>

          <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/90 transition-colors font-semibold">
            <Info size={20} />
            <span>More Info</span>
          </button>

          {user && (
            <button
              onClick={handleMyListToggle}
              className="flex items-center justify-center w-12 h-12 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors"
              title={isInMyList ? 'Remove from My List' : 'Add to My List'}
            >
              {isInMyList ? <Check size={20} /> : <Plus size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />
    </div>
  );
};

export default Hero;