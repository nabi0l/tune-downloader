import React, { useState, useEffect } from 'react';

const SpotifyImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "/artist-placeholder.jpg",
  maxRetries = 3,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setImageSrc(src);
    setImageLoaded(false);
    setImageError(false);
    setRetryCount(0);
  }, [src]);

  const handleImageError = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        // Add cache buster to force reload
        setImageSrc(`${src}?retry=${retryCount + 1}&t=${Date.now()}`);
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      setImageError(true);
      setImageSrc(fallbackSrc);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      {/* Error state */}
      {imageError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-1">👤</div>
            <div className="text-xs">Image unavailable</div>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
};

export default SpotifyImage; 