import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onShowAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onShowAuth }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="text-netflix-red text-2xl font-bold">NETFLIX</div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles..."
                  className="bg-black/50 border border-white text-white px-4 py-2 pr-10 rounded focus:outline-none focus:border-netflix-red"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="absolute right-2 text-white hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {user ? (
            <>
              <Bell className="text-white hover:text-gray-300 transition-colors cursor-pointer" size={20} />
              
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded"
                  />
                  <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-black/90 rounded border border-gray-600 py-2 min-w-[200px]">
                    <div className="px-4 py-2 text-white border-b border-gray-600">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={onShowAuth}
              className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden bg-black/95 border-t border-gray-600">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;