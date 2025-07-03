const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

// GET /api/albums - fetch all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find();
    res.json({ success: true, data: albums });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching albums', error: error.message });
  }
});

module.exports = router;
