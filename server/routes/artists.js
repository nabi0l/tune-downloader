console.log('Artists route loaded');
const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const spotifyService = require('../services/spotifyService');

// GET /api/artists
router.get('/', async (req, res) => {
  const { genre } = req.query;
  let artists = await Artist.find();
  if (genre) {
    artists = artists.filter(artist => artist.genres.includes(genre));
  }
  res.json(artists);
});

// GET /api/artists/featured
router.get('/featured', async (req, res) => {
  try {
    const featuredArtists = await Artist.find({ isFeatured: true }).sort({ popularity: -1 });
    res.json(featuredArtists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id/spotify
router.get('/:id/spotify', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    if (!artist.spotifyId) {
      return res.status(404).json({ error: 'Artist not linked to Spotify' });
    }

    // Get market from query params or default to US
    const market = req.query.market || 'US';
    
    // Fetch fresh data from Spotify
    const [spotifyData, topTracks, albums, relatedArtists] = await Promise.all([
      spotifyService.getArtistDetails(artist.spotifyId),
      spotifyService.getArtistTopTracks(artist.spotifyId, market),
      spotifyService.getArtistAlbums(artist.spotifyId),
      spotifyService.getRelatedArtists(artist.spotifyId)
    ]);

    res.json({
      artist: spotifyData,
      topTracks,
      albums,
      relatedArtists
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id/albums
router.get('/:id/albums', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    const albums = await Album.find({ artist: artist.name });
    res.json({ albums });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id/songs
router.get('/:id/songs', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    const songs = await Song.find({ artist: artist.name });
    res.json({ songs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id/top-tracks
router.get('/:id/top-tracks', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    if (!artist.spotifyId) {
      return res.status(404).json({ error: 'Artist not linked to Spotify' });
    }

    const topTracks = await spotifyService.getArtistTopTracks(artist.spotifyId);
    res.json({ tracks: topTracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/:id/related
router.get('/:id/related', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    if (!artist.spotifyId) {
      return res.status(404).json({ error: 'Artist not linked to Spotify' });
    }

    const relatedArtists = await spotifyService.getRelatedArtists(artist.spotifyId);
    res.json({ artists: relatedArtists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/artists/search-spotify
router.post('/search-spotify', async (req, res) => {
  try {
    const { artistName } = req.body;
    
    if (!artistName) {
      return res.status(400).json({ error: 'Artist name is required' });
    }

    const spotifyArtist = await spotifyService.searchArtist(artistName);
    
    if (!spotifyArtist) {
      return res.status(404).json({ error: 'Artist not found on Spotify' });
    }

    res.json({ artist: spotifyArtist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artists/spotify/albums/:albumId/tracks
router.get('/spotify/albums/:albumId/tracks', async (req, res) => {
  try {
    const { albumId } = req.params;
    if (!albumId) {
      return res.status(400).json({ error: 'Album ID is required' });
    }
    const tracks = await spotifyService.getAlbumTracks(albumId);
    res.json({ tracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;