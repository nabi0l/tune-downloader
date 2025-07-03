const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

// Helper function to escape regex special characters
const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

// Search across songs, albums, and artists
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.json({
        songs: [],
        albums: [],
        artists: []
      });
    }

    // Escape special regex characters and create a case-insensitive regex
    const escapedQuery = escapeRegex(query.trim());
    const searchRegex = new RegExp(escapedQuery, 'i');

    // Search in parallel
    const [songs, albums, artists] = await Promise.all([
      // Search in songs
      Song.find({
        $or: [
          { title: { $regex: searchRegex } },
          { artist: { $regex: searchRegex } },
          { genre: { $regex: searchRegex } },
          { lyrics: { $regex: searchRegex } }
        ]
      })
      .select('title artist coverImage duration')
      .limit(5)
      .lean(),
      
      // Search in albums
      Album.find({
        $or: [
          { title: { $regex: searchRegex } },
          { artist: { $regex: searchRegex } },
          { genre: { $regex: searchRegex } }
        ]
      })
      .select('title artist coverImage releaseDate')
      .limit(5)
      .lean(),
      
      // Search in artists
      Artist.find({
        $or: [
          { name: { $regex: searchRegex } },
          { genre: { $regex: searchRegex } }
        ]
      })
      .select('name image genre')
      .limit(5)
      .lean()
    ]);

    // Log the results for debugging
    console.log('Search results:', { query, songs, albums, artists });

    res.json({
      success: true,
      query,
      songs: songs || [],
      albums: albums || [],
      artists: artists || []
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error performing search', 
      error: error.message 
    });
  }
});

module.exports = router;
