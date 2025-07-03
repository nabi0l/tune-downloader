const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Song = require('../models/Song');
const { auth } = require('../middleware/auth');

// Helper function to get user ID (either from auth or session)
const getUserFromRequest = (req) => {
  if (req.user) {
    return { type: 'user', id: req.user.id };
  }
  // For guest users, generate or use existing guest ID
  let guestId = req.session?.guestId || req.headers['x-guest-id'];
  if (!guestId) {
    guestId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  return { type: 'guest', id: guestId };
};

// Get user's cart
router.get('/', async (req, res) => {
  try {
    const userInfo = getUserFromRequest(req);
    
    if (!userInfo) {
      // Return empty cart for guests without session
      return res.json({
        success: true,
        data: [],
        total: 0
      });
    }

    let cart;
    if (userInfo.type === 'user') {
      cart = await Cart.findOne({ user: userInfo.id }).populate({
        path: 'items.song',
        select: 'title artist coverImage duration genre price'
      });
      
      if (!cart) {
        cart = new Cart({ user: userInfo.id, items: [] });
        await cart.save();
      }
    } else {
      // Guest user - return empty cart (guest carts are handled client-side)
      return res.json({
        success: true,
        data: [],
        total: 0
      });
    }

    // Transform the data to match frontend expectations
    const cartItems = cart.items.map(item => ({
      id: item.song._id,
      title: item.song.title,
      artist: item.song.artist,
      image: item.song.coverImage,
      price: item.price,
      quantity: item.quantity,
      duration: item.song.duration,
      genre: item.song.genre
    }));

    res.json({
      success: true,
      data: cartItems,
      total: cart.total
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart'
    });
  }
});

// Add item to cart - handle both authenticated and guest users
router.post('/', async (req, res) => {
  try {
    console.log('Cart POST request received:', req.body);
    const { trackId, quantity = 1 } = req.body;

    if (!trackId) {
      console.log('No trackId provided in request body');
      return res.status(400).json({
        success: false,
        message: 'Track ID is required'
      });
    }

    console.log('Looking for song with trackId:', trackId);

    // Get song details
    const song = await Song.findById(trackId);
    if (!song) {
      console.error('Song not found for trackId:', trackId);
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    console.log('Song found:', song.title);

    // For now, always return the song data for guest mode
    // This allows the frontend to handle cart management locally
    const responseData = {
      success: true,
      data: {
        id: song._id,
        title: song.title,
        artist: song.artist,
        image: song.coverImage,
        price: song.price || 1.29,
        quantity: quantity,
        duration: song.duration,
        genre: song.genre
      },
      message: 'Item added to cart successfully (guest mode)'
    };

    console.log('Sending response:', responseData);
    return res.json(responseData);
  } catch (error) {
    console.error('Error adding to cart:', error);
    console.error('Request body:', req.body);
    console.error('trackId:', req.body.trackId);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

// Update item quantity
router.put('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    // For now, always return success for guest mode
    // Frontend will handle the actual quantity update
    return res.json({
      success: true,
      message: 'Quantity updated successfully (guest mode)'
    });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quantity'
    });
  }
});

// Remove item from cart
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    
    // For now, always return success for guest mode
    // Frontend will handle the actual removal
    return res.json({
      success: true,
      message: 'Item removed from cart successfully (guest mode)'
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
});

// Clear cart
router.delete('/', async (req, res) => {
  try {
    // For now, always return success for guest mode
    // Frontend will handle the actual clearing
    return res.json({
      success: true,
      message: 'Cart cleared successfully (guest mode)'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
});

module.exports = router; 