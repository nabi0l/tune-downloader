import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    songs: [],
    albums: [],
    artists: []
  });
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState('');

  const search = useCallback(async (query) => {
    const trimmedQuery = query.trim();
    
    // Don't search if the query is empty or the same as the last query
    if (!trimmedQuery || trimmedQuery === lastQuery) {
      if (!trimmedQuery) {
        setSearchResults({ songs: [], albums: [], artists: [] });
      }
      return;
    }


    setLastQuery(trimmedQuery);
    setIsSearching(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(trimmedQuery)}`);
      
      if (response.data.success === false) {
        throw new Error(response.data.message || 'Search failed');
      }

      setSearchResults({
        songs: Array.isArray(response.data.songs) ? response.data.songs : [],
        albums: Array.isArray(response.data.albums) ? response.data.albums : [],
        artists: Array.isArray(response.data.artists) ? response.data.artists : []
      });
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
      setSearchResults({ songs: [], albums: [], artists: [] });
    } finally {
      setIsSearching(false);
    }
  }, [lastQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setLastQuery('');
    setSearchResults({ songs: [], albums: [], artists: [] });
    setError(null);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      search(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, search]);

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    error,
    clearSearch,
    search
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Export the context and provider
export { SearchContext, SearchProvider };

// Export the hook as default
export default SearchContext;
