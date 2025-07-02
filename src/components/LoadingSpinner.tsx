import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-netflix-red border-t-transparent mx-auto mb-4"></div>
        <div className="text-netflix-red text-2xl font-bold">NETFLIX</div>
        <p className="text-white mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;