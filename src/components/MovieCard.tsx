import React, { useState } from 'react';
import { Play, Plus, Check, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay }) => {
  const { user, addToMyList, removeFromMyList } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const isInMyList = user?.myList.includes(movie.id) || false;

  const handleMyListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInMyList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie.id);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(movie);
  };

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Basic Card */}
      <div className="aspect-video bg-gray-800 rounded-md overflow-hidden">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 bg-netflix-dark rounded-md shadow-2xl border border-gray-600 p-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Preview Image */}
          <div className="aspect-video bg-gray-800 rounded-md overflow-hidden mb-3">
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlay}
                className="flex items-center justify-center w-8 h-8 bg-white rounded-full hover:bg-gray-200 transition-colors"
              >
                <Play size={16} fill="currentColor" className="text-black ml-0.5" />
              </button>

              {user && (
                <button
                  onClick={handleMyListToggle}
                  className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors"
                >
                  {isInMyList ? <Check size={16} /> : <Plus size={16} />}
                </button>
              )}

              <button className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors">
                <ThumbsUp size={16} />
              </button>
            </div>

            <button className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full text-white hover:border-white transition-colors">
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Movie Info */}
          <div className="text-white">
            <h3 className="font-semibold mb-2 line-clamp-1">{movie.title}</h3>
            
            <div className="flex items-center space-x-3 text-sm text-gray-300 mb-2">
              <span className="text-green-500 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="border border-gray-500 px-1 text-xs">
                {movie.type === 'tv' ? 'TV' : 'Movie'}
              </span>
              <span>{movie.release_date.split('-')[0]}</span>
            </div>

            <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
              {movie.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;