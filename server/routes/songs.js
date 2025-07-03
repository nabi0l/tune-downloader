const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { auth } = require('../middleware/auth');

// Trending songs
router.get('/trending', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const songs = await Song.find({})
      .sort({ trendScore: -1 })
      .skip(offset)
      .limit(limit);
    res.json({ success: true, data: songs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch trending songs', error: err.message });
  }
});

// New releases
router.get('/new-releases', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const songs = await Song.find({})
      .sort({ releaseDate: -1 })
      .skip(offset)
      .limit(limit);
    res.json({ success: true, data: songs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch new releases', error: err.message });
  }
});

// Record a song play (updates play count and trending score)
router.post('/:id/play', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ 
        success: false, 
        message: 'Song not found' 
      });
    }
    
    await song.recordPlay();
    
    res.json({
      success: true,
      message: 'Play recorded',
      playCount: song.playCount
    });
  } catch (error) {
    console.error('Error recording play:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error recording play',
      error: error.message 
    });
  }
});

// Get all singles (limit 12, most recent first)
router.get('/singles', async (req, res) => {
  try {
    const singles = await Song.find({ isSingle: true })
      .sort({ releaseDate: -1 })
      .limit(12);
    res.json({ success: true, count: singles.length, data: singles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching singles', error: error.message });
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ 
        success: false, 
        message: 'Song not found' 
      });
    }
    
    res.json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching song',
      error: error.message 
    });
  }
});

module.exports = router;
