import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearchContext';
import { FiSearch, FiMusic, FiDisc, FiUser } from 'react-icons/fi';
import defaultAlbumImage from '../../assets/images/home/newRelease/default-album.jpg';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, searchResults, isSearching, search } = useSearch();
  const [queryFromUrl, setQueryFromUrl] = useState('');

  // Get search query from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setQueryFromUrl(query);
    setSearchQuery(query);
    
    if (query) {
      search(query);
    }
  }, [location.search, search, setSearchQuery]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (queryFromUrl.trim()) {
      navigate(`/search?q=${encodeURIComponent(queryFromUrl)}`);
    }
  }, [navigate, queryFromUrl]);

  const resultCount = searchResults.songs.length + 
                    searchResults.albums.length + 
                    searchResults.artists.length;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-8 py-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Search for songs, albums, or artists..."
            value={queryFromUrl}
            onChange={(e) => setQueryFromUrl(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {isSearching ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for "{searchQuery}"...</p>
        </div>
      ) : searchQuery ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">
            {resultCount} {resultCount === 1 ? 'result' : 'results'} for "{searchQuery}"
          </h1>

          {/* Songs Section */}
          {searchResults.songs.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <FiMusic className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Songs</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.songs.map((song) => (
                  <Link
                    key={song._id}
                    to={`/songs/${song._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                        <img
                          src={song.coverImage || song.album?.coverImage || defaultAlbumImage}
                          alt={song.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src = defaultAlbumImage;
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 flex-1 flex flex-col">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 truncate">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{song.artist || 'Unknown Artist'}</p>
                        <div className="mt-1 text-xs text-gray-400">
                          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Albums Section */}
          {searchResults.albums.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <FiDisc className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Albums</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.albums.map((album) => (
                  <Link
                    key={album._id}
                    to={`/albums/${album._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-105">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                        <img
                          src={album.coverImage || defaultAlbumImage}
                          alt={album.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src = defaultAlbumImage;
                          }}
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 truncate">
                          {album.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{album.artist}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Artists Section */}
          {searchResults.artists.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <FiUser className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Artists</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {searchResults.artists.map((artist) => (
                  <Link
                    key={artist._id}
                    to={`/artists/${artist._id}`}
                    className="group text-center"
                  >
                    <div className="bg-white rounded-full w-24 h-24 mx-auto mb-2 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                      <img
                        src={artist.imageUrl || artist.image || '/default-artist.jpg'}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.target;
                          const originalSrc = img.src;
                          let retryCount = 0;
                          const maxRetries = 2;
                          
                          const retryLoad = () => {
                            if (retryCount < maxRetries) {
                              retryCount++;
                              setTimeout(() => {
                                img.src = originalSrc + '?retry=' + retryCount + '&t=' + Date.now();
                              }, 1000 * retryCount);
                            } else {
                              img.src = '/default-artist.jpg';
                            }
                          };
                          
                          retryLoad();
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {artist.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Search for music</h3>
          <p className="mt-1 text-gray-500">Find your favorite songs, albums, and artists</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
