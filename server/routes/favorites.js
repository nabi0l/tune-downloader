const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// JWT authentication middleware
async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    req.mongoUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
  }
}

// POST /api/favorites - Add a favorite (album or song ID)
router.post('/', authenticateJWT, async (req, res) => {
  const { favoriteId } = req.body;
  if (!favoriteId) {
    return res.status(400).json({ success: false, message: 'Missing favoriteId' });
  }
  try {
    const user = req.mongoUser;
    if (!user.favorites.includes(favoriteId)) {
      user.favorites.push(favoriteId);
      await user.save();
    }
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding favorite', error: error.message });
  }
});

// DELETE /api/favorites - Remove a favorite (album or song ID)
router.delete('/', authenticateJWT, async (req, res) => {
  const { favoriteId } = req.body;
  if (!favoriteId) {
    return res.status(400).json({ success: false, message: 'Missing favoriteId' });
  }
  try {
    const user = req.mongoUser;
    user.favorites = user.favorites.filter(id => id !== favoriteId);
    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing favorite', error: error.message });
  }
});

// GET /api/favorites - Get all favorites for the user
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const user = req.mongoUser;
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching favorites', error: error.message });
  }
});

module.exports = router; 