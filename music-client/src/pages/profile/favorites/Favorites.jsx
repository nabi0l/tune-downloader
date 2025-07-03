import React from 'react';
import { useCart } from '../../../contexts/cartContext';
import { FaHeart, FaRegHeart, FaShoppingCart, FaPlay, FaUser, FaMusic } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, addToCart } = useCart();

  // Debug logging
  console.log('Favorites page - favorites array:', favorites);
  console.log('Favorites page - favorites length:', favorites.length);

  const handleAddToCart = (item) => {
    if (item.type !== 'artist' && item.price > 0) {
      addToCart(item);
    }
  };

  const handleToggleFavorite = (item) => {
    console.log('Removing favorite:', item);
    toggleFavorite(item.id, true);
  };

  const renderItemCard = (item) => {
    const isArtist = item.type === 'artist';
    const isAlbum = item.type === 'album' || (!item.duration && item.price > 5);
    const isSong = !isArtist && !isAlbum;

    return (
      <motion.div 
        key={item.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="relative aspect-square">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/default-cover.jpg';
            }}
          />
          {isArtist && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
              Artist
            </div>
          )}
          {isAlbum && (
            <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
              Album
            </div>
          )}
          {isSong && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              Song
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold truncate">{item.title}</h3>
          <p className="text-gray-600 text-sm truncate mb-2">
            {isArtist ? item.location : item.artist}
          </p>
          
          {isArtist && item.bio && (
            <p className="text-gray-500 text-xs mb-2 line-clamp-2">{item.bio}</p>
          )}
          
          <div className="flex justify-between items-center">
            {isArtist ? (
              <span className="text-sm text-gray-500">{item.followers} followers</span>
            ) : (
              <span className="font-bold">${item.price?.toFixed(2) || '0.00'}</span>
            )}
            <div className="flex space-x-2">
              {!isArtist && item.price > 0 && (
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="text-gray-700 hover:text-black"
                  title="Add to cart"
                >
                  <FaShoppingCart />
                </button>
              )}
              {isSong && (
                <button 
                  className="text-gray-700 hover:text-black"
                  title="Play"
                >
                  <FaPlay />
                </button>
              )}
              {isArtist && (
                <button 
                  className="text-gray-700 hover:text-black"
                  title="View artist"
                >
                  <FaUser />
                </button>
              )}
              <button 
                onClick={() => handleToggleFavorite(item)}
                className="text-red-500 hover:text-red-700"
                title="Remove from favorites"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container  min-h-screen mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 py-4">Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <FaRegHeart className="mx-auto text-5xl text-gray-300 mb-4" />
          <p className="text-xl text-gray-600">You don't have any favorites yet</p>
          <p className="text-gray-500 mt-2">Start exploring music and add your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(renderItemCard)}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;