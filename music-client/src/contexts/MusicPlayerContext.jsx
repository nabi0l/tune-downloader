// src/contexts/MusicPlayerContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const playTrack = async (track) => {
    if (!track.audioSrc) {
      console.warn("No audio source available for this track");
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
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

  

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        setCurrentTrack,
        setIsPlaying,
        playTrack,
        pauseTrack,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        user,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
