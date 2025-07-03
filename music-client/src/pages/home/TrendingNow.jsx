import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import useTrendingSongs from "../../hooks/useTrendingSongs";
import { useCart } from "../../contexts/cartContext";

const TrendingNow = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { songs: trendingSongs, loading, error } = useTrendingSongs(10);
  const { addToCart, favorites, toggleFavorite } = useCart();

  // Check if a song is in favorites
  const isFavorite = (songId) => {
    return favorites.some(fav => fav.id === songId || fav._id === songId);
  };

  // Handle favorite toggle
  const handleToggleFavorite = (song) => {
    const songData = {
      id: song._id,
      title: song.title,
      artist: song.artist,
      image: song.coverImage,
      price: song.price || 1.29,
      duration: song.duration,
      genre: song.genre,
      type: 'song'
    };
    
    toggleFavorite(song._id, isFavorite(song._id), songData);
  };

  // Fallback images for songs without cover images
  const getFallbackImage = (index) => {
    const fallbackImages = [
      "/src/assets/images/home/trendingSong/prodigal.jpeg",
      "/src/assets/images/home/trendingSong/desperate.jpeg",
      "/src/assets/images/home/trendingSong/in the room.jpg",
      "/src/assets/images/home/trendingSong/jelly.jpeg",
      "/src/assets/images/home/trendingSong/these are.jpg",
      "/src/assets/images/home/trendingSong/lion.avif",
      "/src/assets/images/home/trendingSong/nol's.webp",
      "/src/assets/images/home/trendingSong/nothing else.jpg",
      "/src/assets/images/home/trendingSong/your's way.jpeg",
      "/src/assets/images/home/trendingSong/that's who i praise.webp",
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  // Generate trending tags based on play count and trend score
  const getTrendingTag = (song, index) => {
    if (song.playCount > 5000) return "Viral";
    if (song.playCount > 3000) return "Most Shared";
    if (song.playCount > 1000) return "Trending";
    if (index < 3) return "Staff Pick";
    return "Trending Now";
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle add to cart
  const handleAddToCart = (song) => {
    const songData = {
      id: song._id,
      title: song.title,
      artist: song.artist,
      image: song.coverImage,
      price: song.price || 1.29,
      duration: song.duration,
      genre: song.genre
    };
    addToCart(songData);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-justify">
          <h2 className="text-4xl font-bold mb-3 text-black">Trending Now</h2>
          <p className="text-gray-600 text-lg">
            Loading trending songs...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-3 text-black">Trending Now</h2>
          <p className="text-red-600">Error loading trending songs: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="mb-10 text-justify">
        <h2 className="text-4xl font-bold mb-3 text-black">
          Trending Now
        </h2>
        <p className="text-gray-600 text-lg">
          Handpicked gospel and worship tracks lighting up this week's charts.
        </p>
      </div>
      <div className="relative px-12">
        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {trendingSongs.map((song, index) => (
            <SwiperSlide key={song._id}>
              <div
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full mb-8"
                onMouseEnter={() => setHoveredCard(song._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                    {getTrendingTag(song, index)}
                  </span>
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={song.coverImage || getFallbackImage(index)}
                    alt={song.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hoveredCard === song._id ? "scale-110" : "scale-100"
                    }`}
                    onError={(e) => {
                      e.target.src = getFallbackImage(index);
                    }}
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                      hoveredCard === song._id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      className="action-button bg-white/90 p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(song);
                      }}
                    >
                      {isFavorite(song._id) ? (
                        <FaHeart className="h-5 w-5 text-red-500" />
                      ) : (
                        <FaRegHeart className="h-5 w-5 text-black" />
                      )}
                    </button>
                    <button
                      className="action-button bg-white/90 p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(song);
                      }}
                    >
                      <FaShoppingCart className="h-5 w-5 text-black" />
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg truncate">{song.title}</h3>
                  <p className="text-gray-600 text-sm truncate">
                    {song.artist}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {formatDuration(song.duration)} • {song.playCount} plays
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          style={{ left: "20px" }}
          aria-label="Previous"
        >
          <FaChevronLeft className="text-black text-lg" />
        </button>
        <button
          className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          style={{ right: "20px" }}
          aria-label="Next"
        >
          <FaChevronRight className="text-black text-lg" />
        </button>
      </div>
    </div>
  );
};

export default TrendingNow;
