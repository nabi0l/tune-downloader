import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaShoppingCart, FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import SingleHero from './SingleHero';
import { useCart } from '../../../contexts/cartContext';

const Singles = () => {
  const [singles, setSingles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, favorites, toggleFavorite } = useCart();

  useEffect(() => {
    const fetchSingles = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://tune-downloader.onrender.com/api/songs/singles');
        const data = await response.json();
        if (data.success) {
          setSingles(data.data);
        } else {
          setError('Failed to fetch singles');
        }
      } catch (err) {
        setError('Failed to fetch singles');
      } finally {
        setLoading(false);
      }
    };
    fetchSingles();
  }, []);

  // Filter and sort logic - simplified to only use search
  const filteredSingles = singles
    .filter(single => {
      // Apply search filter only
      return single.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             single.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
             (single.genre && single.genre.toLowerCase().includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => {
      // Simple sort by title (A-Z)
      return a.title.localeCompare(b.title);
    });

  const togglePlay = (trackId) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
      // Pause audio logic here
    } else {
      setPlayingTrack(trackId);
      // Play audio logic here
    }
  };

  const toggleWishlist = (trackId) => {
    const isCurrentlyFavorited = favorites.some(fav => fav.id === trackId);
    const single = singles.find(s => s.id === trackId);
    if (single) {
      const itemData = {
        id: single.id,
        title: single.title,
        artist: single.artist,
        image: single.coverImage,
        price: single.price || 1.29,
        duration: single.duration || '3:45',
        genre: single.genre || 'Worship',
      };
      toggleFavorite(trackId, isCurrentlyFavorited, itemData);
    }
  };

  const handleAddToCart = (single) => {
    // Prepare the single data for addToCart
    const cartItem = {
      id: single._id || single.id,
      title: single.title,
      artist: single.artist,
      image: single.coverImage,
      price: single.price || 1.29,
      duration: single.duration,
      genre: single.genre || '',
    };
    addToCart(cartItem);
    // Provide feedback
    console.log(`${single.title} added to cart!`);
    // Optionally show a toast or alert
    // alert(`${single.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SingleHero/>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading singles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-8 bg-white rounded-xl shadow-sm p-6 sticky top-0 z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-2xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search singles, artists, or genres..."
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-medium">{filteredSingles.length}</span> singles
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Singles Grid */}
            {filteredSingles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSingles.map((single) => (
                  <div key={single.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-square">
                      <img 
                        src={single.coverImage} 
                        alt={`${single.title} cover`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => togglePlay(single.id)}
                        className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white rounded-full p-3 hover:bg-opacity-100 transition-all transform hover:scale-105"
                      >
                        {playingTrack === single.id ? <FaPause /> : <FaPlay />}
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{single.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{single.artist}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-lg font-bold text-gray-900">${(single.price || 0).toFixed(2)}</span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => toggleWishlist(single.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label={favorites.some(fav => fav.id === single.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                          >
                            {favorites.some(fav => fav.id === single.id) ? (
                              <FaHeart className="text-red-500" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </button>
                          <button 
                            onClick={() => handleAddToCart(single)}
                            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center"
                          >
                            <FaShoppingCart className="mr-2" />
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No singles found matching your criteria.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Singles;