import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = "http://localhost:5000/api";

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (token && userId) {
          // Load authenticated user's data
          try {
            // Load cart
            const cartRes = await fetch(`${API_BASE_URL}/cart`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (cartRes.status === 401) {
              // Token is invalid, clear it and load guest data
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              throw new Error("Invalid token");
            }

            const cartData = await cartRes.json();
            if (cartData.success) setCart(cartData.data || []);

            // Load favorites from backend (you'll need to create this endpoint)
            try {
              const favRes = await fetch(`${API_BASE_URL}/favorites`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              
              if (favRes.ok) {
                const favData = await favRes.json();
                if (favData.success) {
                  setFavorites(favData.data || []);
                }
              }
            } catch (favError) {
              console.log("Failed to load favorites from backend, using local storage");
              // Fall back to local storage favorites
              const localFavs = JSON.parse(localStorage.getItem("guestFavorites") || "[]");
              setFavorites(localFavs);
            }
          } catch (error) {
            console.log("Failed to load authenticated data, falling back to guest mode");
            // Fall back to guest data
            const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
            const guestFavs = JSON.parse(localStorage.getItem("guestFavorites") || "[]");
            setCart(guestCart);
            setFavorites(guestFavs);
          }
        } else {
          // Load guest data
          const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
          const guestFavs = JSON.parse(localStorage.getItem("guestFavorites") || "[]");
          setCart(guestCart);
          setFavorites(guestFavs);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        // Load guest data as fallback
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const guestFavs = JSON.parse(localStorage.getItem("guestFavorites") || "[]");
        setCart(guestCart);
        setFavorites(guestFavs);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        // Authenticated user
        const response = await fetch(`${API_BASE_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ trackId: item.id || item._id }),
        });

        if (response.status === 401) {
          // Token is invalid, clear it and proceed as guest
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          console.log("Invalid token cleared, proceeding as guest");
        } else if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === data.data.id);
            if (existingItemIndex >= 0) {
              // Update quantity of existing item
              setCart(prev => prev.map((cartItem, index) => 
                index === existingItemIndex 
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ));
            } else {
              // Add new item
              setCart(prev => [...prev, data.data]);
            }
            return; // Exit early if successful
          }
        }
      }
      
      // If no token or token was invalid or request failed, proceed as guest
      // Guest user
      const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      let newCart;
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newCart = cart.map((cartItem, index) => 
          index === existingItemIndex 
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        // Add new item with default quantity
        newCart = [...cart, { ...item, quantity: 1 }];
      }
      
      setCart(newCart);
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Fallback to guest mode on error
      const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      let newCart;
      
      if (existingItemIndex >= 0) {
        newCart = cart.map((cartItem, index) => 
          index === existingItemIndex 
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        newCart = [...cart, { ...item, quantity: 1 }];
      }
      
      setCart(newCart);
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch(`${API_BASE_URL}/cart/${itemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const newCart = cart.filter((item) => item.id !== itemId);
      setCart(newCart);
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  // Update cart quantity
  const updateCartQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        // Update on server
        await fetch(`${API_BASE_URL}/cart/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      }

      // Update local state
      setCart((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      
      // Update localStorage for guest users
      if (!token) {
        const newCart = cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("guestCart", JSON.stringify(newCart));
      }
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
  };

  // Toggle favorite
  const toggleFavorite = async (itemId, isFavorite, itemData = null) => {
    try {
      const token = localStorage.getItem("token");
      
      console.log('toggleFavorite called with:', { itemId, isFavorite, itemData, token: !!token });

      if (isFavorite) {
        // Remove from favorites
        console.log('Removing favorite:', itemId);
        setFavorites((prev) => {
          const newFavs = prev.filter((item) => item.id !== itemId);
          console.log('New favorites after removal:', newFavs);
          return newFavs;
        });
        
        if (token) {
          // Remove from backend
          try {
            await fetch(`${API_BASE_URL}/favorites/${itemId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (error) {
            console.error("Failed to remove favorite from backend:", error);
          }
        } else {
          // Update localStorage for guest users
          const newFavs = favorites.filter((item) => item.id !== itemId);
          localStorage.setItem("guestFavorites", JSON.stringify(newFavs));
          console.log('Updated localStorage favorites:', newFavs);
        }
      } else {
        // Add to favorites - use the complete item data if provided
        const itemToAdd = itemData || { id: itemId };
        console.log('Adding favorite:', itemToAdd);
        setFavorites((prev) => {
          const newFavs = [...prev, itemToAdd];
          console.log('New favorites after addition:', newFavs);
          return newFavs;
        });
        
        if (token) {
          // Add to backend
          try {
            await fetch(`${API_BASE_URL}/favorites`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ favoriteId: itemToAdd.id }),
            });
          } catch (error) {
            console.error("Failed to add favorite to backend:", error);
          }
        } else {
          // Update localStorage for guest users
          const newFavs = [...favorites, itemToAdd];
          localStorage.setItem("guestFavorites", JSON.stringify(newFavs));
          console.log('Updated localStorage favorites:', newFavs);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Sync guest data after login
  const syncGuestData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

      // Sync cart
      await Promise.all(
        guestCart.map((item) =>
          fetch(`${API_BASE_URL}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ trackId: item.id }),
          }).catch(console.error)
        )
      );

      // Clear guest data
      localStorage.removeItem("guestCart");
      localStorage.removeItem("guestFavorites");
    } catch (error) {
      console.error("Failed to sync guest data:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        isLoading,
        addToCart,
        removeFromCart,
        toggleFavorite,
        updateCartQuantity,
        setUserId,
        syncGuestData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
