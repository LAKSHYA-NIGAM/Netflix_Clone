import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onPlay }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left' 
        ? rowRef.current.scrollLeft - scrollAmount
        : rowRef.current.scrollLeft + scrollAmount;
      
      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <div className="relative group mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-12">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-16 bg-gradient-to-r from-netflix-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity hover:from-black/80"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-16 bg-gradient-to-l from-netflix-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity hover:from-black/80"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-64 md:w-80">
              <MovieCard movie={movie} onPlay={onPlay} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;