import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSearch, FiX, FiMusic, FiDisc, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearchContext';

const SearchBar = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching, 
    clearSearch 
  } = useSearch();
  
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query) return;
    
    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearchQuery('');
    setIsFocused(false);
  }, [searchQuery, navigate, setSearchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
    } else if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const hasResults = searchResults.songs.length > 0 || 
                   searchResults.albums.length > 0 || 
                   searchResults.artists.length > 0;

  // Render search result item
  const renderResultItem = (item, type) => {
    const icons = {
      song: <FiMusic className="text-blue-500 mr-3 flex-shrink-0" />,
      album: <FiDisc className="text-purple-500 mr-3 flex-shrink-0" />,
      artist: <FiUser className="text-green-500 mr-3 flex-shrink-0" />
    };

    const getPath = (item, type) => {
      switch (type) {
        case 'song': return `/songs/${item._id}`;
        case 'album': return `/albums/${item._id}`;
        case 'artist': return `/artists/${item._id}`;
        default: return '#';
      }
    };

    const getSubtitle = (item, type) => {
      switch (type) {
        case 'song': 
          return (
            <div className="text-xs text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {item.artist} • {item.genre} • {formatDuration(item.duration || 0)}
            </div>
          );
        case 'album':
          return (
            <div className="text-xs text-gray-500">
              {item.artist} • {item.releaseDate ? new Date(item.releaseDate).getFullYear() : ''}
            </div>
          );
        case 'artist':
          return item.genre ? (
            <div className="text-xs text-gray-500">{item.genre}</div>
          ) : null;
        default:
          return null;
      }
    };

    return (
      <Link
        key={`${type}-${item._id}`}
        to={getPath(item, type)}
        className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-150"
        onClick={() => setIsFocused(false)}
      >
        {icons[type]}
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-900 truncate">
            {item.title || item.name}
          </div>
          {getSubtitle(item, type)}
        </div>
      </Link>
    );
  };

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for songs, albums, or artists..."
          className="w-full px-4 py-2 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search for music"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
            aria-label="Clear search"
          >
            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isFocused && searchQuery && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-pulse">Searching...</div>
              </div>
            ) : hasResults ? (
              <>
                {/* Songs Section */}
                {searchResults.songs.length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                      Songs
                    </div>
                    {searchResults.songs.map(song => renderResultItem(song, 'song'))}
                  </div>
                )}

                {/* Albums Section */}
                {searchResults.albums.length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                      Albums
                    </div>
                    {searchResults.albums.map(album => renderResultItem(album, 'album'))}
                  </div>
                )}

                {/* Artists Section */}
                {searchResults.artists.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                      Artists
                    </div>
                    {searchResults.artists.map(artist => renderResultItem(artist, 'artist'))}
                  </div>
                )}

                {/* View All Results Link */}
                <div className="border-t border-gray-100 bg-gray-50 p-2 text-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
