import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaRegHeart,
  FaMusic,
  FaCompactDisc,
  FaMicrophone,
} from "react-icons/fa";
import { fetchAllAlbums } from '../../../services/artistApi';
import { useCart } from '../../../contexts/cartContext';
import defaultAlbumImage from '../../../assets/images/home/newRelease/default-album.jpg';

const AlbumGrid = ({ filter = 'all', sortBy = 'popularity', searchQuery = '' }) => {
  const [hoveredAlbum, setHoveredAlbum] = useState(null);
  const [playingPreview, setPlayingPreview] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, addToCart } = useCart();

  useEffect(() => {
    const getAlbums = async () => {
      setLoading(true);
      try {
        const data = await fetchAllAlbums();
        console.log('Fetched albums:', data);
        
        // Log first album's image URL for debugging
        if (data && data.length > 0) {
          console.log('First album data:', {
            title: data[0].title,
            coverImage: data[0].coverImage,
            hasImage: !!data[0].coverImage,
            imageUrl: data[0].coverImage || data[0].image
          });
          
          // Test the first image URL
          const testImg = new Image();
          testImg.onload = () => {
            console.log('✅ Test image loaded successfully:', {
              src: testImg.src,
              width: testImg.naturalWidth,
              height: testImg.naturalHeight
            });
          };
          testImg.onerror = () => {
            console.error('❌ Test image failed to load:', testImg.src);
          };
          testImg.src = data[0].coverImage;
        }
        
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };
    getAlbums();
  }, []);

  // Filter and sort albums
  const getFilteredAndSortedAlbums = () => {
    let filteredAlbums = [...albums];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredAlbums = filteredAlbums.filter(album => 
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query) ||
        (album.genre && album.genre.some(g => g.toLowerCase().includes(query)))
      );
    }

    // Apply category filter
    if (filter && filter !== 'all') {
      switch (filter) {
        case 'popular':
          filteredAlbums = filteredAlbums.filter(album => album.isFeatured || album.popularity > 70);
          break;
        case 'new':
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          filteredAlbums = filteredAlbums.filter(album => 
            new Date(album.releaseDate) >= sixMonthsAgo
          );
          break;
        case 'worship':
          filteredAlbums = filteredAlbums.filter(album => 
            album.genre && album.genre.some(g => g.toLowerCase().includes('worship'))
          );
          break;
        case 'gospel':
          filteredAlbums = filteredAlbums.filter(album => 
            album.genre && album.genre.some(g => g.toLowerCase().includes('gospel'))
          );
          break;
        case 'hymns':
          filteredAlbums = filteredAlbums.filter(album => 
            album.genre && album.genre.some(g => g.toLowerCase().includes('hymn'))
          );
          break;
        case 'contemporary':
          filteredAlbums = filteredAlbums.filter(album => 
            album.genre && album.genre.some(g => g.toLowerCase().includes('contemporary'))
          );
          break;
        case 'christmas':
          filteredAlbums = filteredAlbums.filter(album => 
            album.title.toLowerCase().includes('christmas') ||
            album.artist.toLowerCase().includes('christmas')
          );
          break;
        default:
          // For other filters, try to match genre
          filteredAlbums = filteredAlbums.filter(album => 
            album.genre && album.genre.some(g => g.toLowerCase().includes(filter.toLowerCase()))
          );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filteredAlbums.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
        filteredAlbums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'oldest':
        filteredAlbums.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        break;
      case 'title-asc':
        filteredAlbums.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filteredAlbums.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'artist':
        filteredAlbums.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      default:
        // Default to popularity
        filteredAlbums.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return filteredAlbums;
  };

  const filteredAlbums = getFilteredAndSortedAlbums();

  const toggleWishlist = (id) => {
    const isCurrentlyFavorited = favorites.some(fav => fav.id === id);
    const album = albums.find(a => a._id === id);
    if (album) {
      const itemData = {
        id: album._id,
        title: album.title,
        artist: album.artist,
        image: album.coverImage || defaultAlbumImage,
        price: album.price || 9.99,
        duration: album.duration || '45:00',
        genre: album.genre || 'Worship',
        type: album.type || 'album',
      };
      toggleFavorite(id, isCurrentlyFavorited, itemData);
    }
  };

  const togglePreview = (id) => {
    setPlayingPreview(playingPreview === id ? null : id);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'studio':
        return <FaMusic className="w-3 h-3" />;
      case 'live':
        return <FaMicrophone className="w-3 h-3" />;
      case 'single':
        return <FaCompactDisc className="w-3 h-3" />;
      default:
        return <FaMusic className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-600 text-lg">Loading albums...</p>
        </div>
      </div>
    );
  }

  // Show no results message
  if (filteredAlbums.length === 0) {
    return (
      <div className="py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No albums found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? `No albums match "${searchQuery}"`
              : `No albums found for "${filter}" category`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {filteredAlbums.length} of {albums.length} albums
        {filter !== 'all' && ` in ${filter}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAlbums.map((album) => (
          <div
            key={album._id}
            className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-black transition-all duration-300 hover:shadow-2xl"
            onMouseEnter={() => setHoveredAlbum(album._id)}
            onMouseLeave={() => setHoveredAlbum(null)}
          >
            {/* Album Cover - Minimal Version */}
            <div className="w-full h-72 bg-white border border-gray-200">
              <img
                src={album.coverImage || album.image || defaultAlbumImage}
                alt={`${album.title} cover`}
                className="w-full h-full object-cover"
                onLoad={(e) => {
                  console.log('✅ Image loaded:', album.title, e.target.src);
                }}
                onError={(e) => {
                  console.error('❌ Image failed:', album.title, e.target.src);
                  e.target.src = defaultAlbumImage;
                }}
              />
            </div>

            {/* Album Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2">
                    {album.title}
                  </h3>
                  <p className="text-gray-600 font-medium">{album.artist}</p>
                </div>
                <button
                  onClick={() => toggleWishlist(album._id)}
                  className="text-gray-400 hover:text-black transition-colors duration-200 ml-4"
                >
                  {favorites.some(fav => fav.id === album._id) ? (
                    <FaHeart className="text-black w-5 h-5" />
                  ) : (
                    <FaRegHeart className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="font-medium">{new Date(album.releaseDate).getFullYear()}</span>
                <span className="mx-2">•</span>
                <span>{album.label}</span>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-black">
                  ${album.price}
                </span>
                <button
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
                  onClick={() => addToCart({
                    id: album._id,
                    title: album.title,
                    artist: album.artist,
                    image: album.coverImage || defaultAlbumImage,
                    price: album.price,
                    type: album.type,
                    // ...any other fields your cart expects
                  })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumGrid;
