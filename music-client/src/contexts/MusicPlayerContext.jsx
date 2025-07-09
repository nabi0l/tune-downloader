// src/contexts/MusicPlayerContext.js
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

// Create context with default value
const MusicPlayerContext = createContext({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  playTrack: () => {},
  pauseTrack: () => {},
  stopTrack: () => {},
  seekTo: () => {},
  setVolumeLevel: () => {},
  toggleMute: () => {},
  formatTime: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  user: null,
  audioRef: null,
});

export const MusicPlayerProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Add missing function definitions
  const fetchUserCart = async (userId) => {
    // Implement your server cart fetching logic
    const response = await fetch(`/api/cart/${userId}`);
    return response.json();
  };

  const getTrackPreview = async (track) => {
    // Implement your track preview logic
    return track.previewUrl || "/default-preview.mp3";
  };

  const playTrack = useCallback(async (track) => {
    console.log('Attempting to play track:', track);
    if (!track || !track.audioUrl) {
      console.error('Invalid track or missing audioUrl:', track);
      throw new Error('This track is not available for playback at the moment.');
    }
    try {
      // Use the single audioRef for playback
      const audio = audioRef.current;
      if (!audio) throw new Error('Audio element not available');

      // Pause and reset if something is already playing
      audio.pause();
      audio.currentTime = 0;
      audio.src = track.audioUrl;
      audio.volume = volume;
      audio.muted = isMuted;

      // Wait for canplaythrough before playing
      await new Promise((resolve, reject) => {
        const onCanPlay = () => {
          audio.removeEventListener('canplaythrough', onCanPlay);
          audio.removeEventListener('error', onError);
          resolve();
        };
        const onError = () => {
          audio.removeEventListener('canplaythrough', onCanPlay);
          audio.removeEventListener('error', onError);
          reject(new Error('Audio failed to load'));
        };
        audio.addEventListener('canplaythrough', onCanPlay);
        audio.addEventListener('error', onError);
        // Timeout fallback
        setTimeout(() => {
          audio.removeEventListener('canplaythrough', onCanPlay);
          audio.removeEventListener('error', onError);
          reject(new Error('Audio load timeout'));
        }, 10000);
      });
      await audio.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      setCurrentTrack(null);
      throw new Error(`Unable to play this track. Please try another track.: ${error.message}`);
    }
  }, [audioRef, volume, isMuted]);

  const pauseTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.removeAttribute('src');
      audio.load();
      audio.currentTime = 0;
    }
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const stopTrack = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolumeLevel = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleError = (error) => {
    const audio = audioRef.current;
    console.error("Audio playback error:", error);
    if (audio) {
      console.error("Audio src that failed:", audio.src);
    }
    setIsPlaying(false);
  };

  // Format time utility
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const loadCart = async () => {
      // Fix: Correct JSON.parse syntax
      const localCart = JSON.parse(localStorage.getItem("musicCart") || "[]");

      if (user) {
        try {
          const serverCart = await fetchUserCart(user.id);
          // Merge carts (prioritize server cart for duplicates)
          const mergedCart = [...localCart, ...serverCart].filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );
          setCart(mergedCart);
          await syncCartToServer(mergedCart);
        } catch (error) {
          console.error("Failed to load server cart, using local", error);
          setCart(localCart);
        }
      } else {
        setCart(localCart);
      }
    };

    loadCart();
  }, [user]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("musicCart", JSON.stringify(cart));
    if (user) {
      // Debounced sync to server
      const timer = setTimeout(() => {
        syncCartToServer(cart);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cart, user]);

  const syncCartToServer = async (cartItems) => {
    if (!user) return;
    try {
      await fetch("/api/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, items: cartItems }),
      });
    } catch (error) {
      console.error("Cart sync failed", error);
    }
  };

  const addToCart = async (track) => {
    const cartItem = {
      ...track,
      price: 0.99,
      addedAt: new Date().toISOString(),
      // Ensure required fields for audio playback
      audioSrc: track.audioSrc || (await getTrackPreview(track)),
    };

    setCart((prev) => {
      const exists = prev.some((item) => item.id === track.id);
      return exists ? prev : [...prev, cartItem];
    });

    return true;
  };

  const removeFromCart = (trackId) => {
    setCart((prev) => prev.filter((item) => item.id !== trackId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    setCurrentTrack,
    setIsPlaying,
    playTrack,
    pauseTrack,
    stopTrack,
    seekTo,
    setVolumeLevel,
    toggleMute,
    formatTime,
    closePlayer,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    user,
    audioRef,
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        style={{ display: 'none' }}
      />
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
