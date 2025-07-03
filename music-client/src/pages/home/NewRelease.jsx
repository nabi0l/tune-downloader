import React, { useState } from "react";
import { FaPlay, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useNewReleases from "../../hooks/useNewReleases";
import { useCart } from "../../contexts/cartContext";

const NewRelease = () => {
  const [activeTab, setActiveTab] = useState('singles');
  const [isLoading, setIsLoading] = useState(false);
  const { songs: newReleases, loading, error } = useNewReleases(50);
  const { addToCart, favorites, toggleFavorite } = useCart();

  // Fallback images for songs without cover images
  const getFallbackImage = (index) => {
    const fallbackImages = [
      "/src/assets/images/home/newRelease/thankfull and blessed.jpeg",
      "/src/assets/images/home/newRelease/TobyMac_Heaven_On_My_Mind.jpg",
      "/src/assets/images/home/newRelease/still waters.jpeg",
      "/src/assets/images/home/newRelease/child of god.jpeg",
      "/src/assets/images/home/newRelease/blinded.jpeg",
      "/src/assets/images/home/newRelease/thank-God.jpeg",
      "/src/assets/images/home/newRelease/windflowers.jpeg",
      "/src/assets/images/home/newRelease/light.jpeg",
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format release date
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return "recently released";
    } else if (diffDays <= 30) {
      return "released this month";
    } else {
      return `released in ${date.getFullYear()}`;
    }
  };

  // Determine if a song is new (released within last 30 days)
  const isNewRelease = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  // Filter songs by type (singles vs albums)
  const filterSongsByType = (songs, type) => {
    if (type === 'singles') {
      // For singles, we'll consider songs that are part of albums as singles
      // Limit to 10 items
      return songs.filter(song => song.album && song.album.trim() !== '').slice(0, 10);
    } else {
      // For albums, we'll group songs by album and create album entries
      const albumMap = new Map();
      songs.forEach(song => {
        if (song.album && song.album.trim() !== '') {
          if (!albumMap.has(song.album)) {
            albumMap.set(song.album, {
              id: song.album,
              title: song.album,
              artist: song.artist,
              image: song.coverImage || getFallbackImage(0),
              type: 'Album',
              date: formatReleaseDate(song.releaseDate),
              price: '$9.99',
              isNew: isNewRelease(song.releaseDate),
              songs: []
            });
          }
          albumMap.get(song.album).songs.push(song);
        }
      });
      // Limit to 10 albums
      return Array.from(albumMap.values()).slice(0, 10);
    }
  };

  const musicData = {
    singles: filterSongsByType(newReleases, 'singles').map((song, index) => ({
      id: song._id,
      title: song.title,
      artist: song.artist,
      image: song.coverImage || getFallbackImage(index),
      type: "Single",
      date: formatReleaseDate(song.releaseDate),
      price: "$1.29",
      isNew: isNewRelease(song.releaseDate),
      duration: formatDuration(song.duration)
    })),
    albums: filterSongsByType(newReleases, 'albums')
  };

  const MusicGridItem = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isLiked = favorites.some(fav => fav.id === item.id);

    const handleAddToCart = () => {
      const cartItem = {
        id: item.id,
        title: item.title,
        artist: item.artist,
        image: item.image,
        price: typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price,
        duration: item.duration,
        genre: item.genre || '',
      };
      addToCart(cartItem);
      // Optionally show feedback
      // alert(`${item.title} added to cart!`);
      console.log(`${item.title} added to cart!`);
    };

    const handleToggleFavorite = () => {
      const cartItem = {
        id: item.id,
        title: item.title,
        artist: item.artist,
        image: item.image,
        price: typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price,
        duration: item.duration,
        genre: item.genre || '',
      };
      toggleFavorite(item.id, isLiked, cartItem);
    };

    return (
      <motion.div
        className="relative bg-white rounded-xl shadow-md overflow-hidden flex-col h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Type Badge */}
        <span className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-xs font-bold ${
          item.type === "Single" ? "bg-blue-500 text-white" : "bg-black text-white"
        }`}>
          {item.type}
        </span>
        
        {/* New Badge */}
        {item.isNew && (
          <span className="absolute top-3 right-3 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            New
          </span>
        )}

        {/* Cover Art */}
        <div className="relative aspect-square">
          <img
            src={item.image}
            alt={`${item.title} - ${item.artist}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = getFallbackImage(0);
            }}
          />
        </div>

        {/* Info Section */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="font-bold text-lg truncate">{item.title}</h3>
            <p className="text-gray-600 text-sm truncate">{item.artist}</p>
            {item.duration && (
              <p className="text-gray-500 text-xs mt-1">{item.duration}</p>
            )}
          </div>

          {/* Release Date and Price */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-gray-500">
                {item.date}
              </span>
              {item.price && (
                <span className="font-bold text-black">{item.price}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-2">
              <button className="flex-1 bg-gray-100 text-black py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                <FaPlay className="mr-2" size={14} />
                <span className="text-xs">Play</span>
              </button>
              <button
                className="flex-1 bg-gray-100 text-black py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="mr-2" size={14} />
                <span className="text-xs">Cart</span>
              </button>
              <button
                className="flex-1 bg-gray-100 text-black py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={handleToggleFavorite}
              >
                {isLiked ? (
                  <FaHeart className="mr-2 text-red-500" size={14} />
                ) : (
                  <FaRegHeart className="mr-2" size={14} />
                )}
                <span className="text-xs">Wish</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Latest Singles and Albums</h2>
            <p className="text-gray-600 text-lg mb-6">
              Loading new releases...
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Latest Singles and Albums</h2>
          <p className="text-red-600">Error loading new releases: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">Latest Singles and Albums</h2>
          <p className="text-gray-600 text-lg mb-6">
            From new voices to seasoned artists - hear what's new.
          </p>
          <p className="text-sm text-gray-500">
            Showing {musicData[activeTab].length} {activeTab === 'singles' ? 'singles' : 'albums'}
          </p>
        </div>
        
        <div className="flex flex-col items-end space-y-4">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => handleTabChange('singles')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'singles' ? 'bg-black text-white' : 'text-gray-700'
              }`}
            >
              Singles
            </button>
            <button
              onClick={() => handleTabChange('albums')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'albums' ? 'bg-black text-white' : 'text-gray-700'
              }`}
            >
              Albums
            </button>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            View All {activeTab === 'singles' ? 'Singles' : 'Albums'} →
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {musicData[activeTab].map((item) => (
            <MusicGridItem key={item.id} item={item} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default NewRelease;
