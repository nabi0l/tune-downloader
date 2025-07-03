const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Song = require('../models/Song');
const { auth, adminAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp3|m4a|wav|ogg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only audio and image files are allowed'));
    }
  }
});

// Apply admin middleware to all routes in this router
router.use(auth, adminAuth);

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Update user role (admin only)
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // TODO: Delete user from Firebase Auth if needed
    // await admin.auth().deleteUser(user.firebaseUid);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Songs Management

// Get all songs with pagination and search
router.get('/songs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
        { album: { $regex: search, $options: 'i' } }
      ];
    }

    const [songs, total] = await Promise.all([
      Song.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Song.countDocuments(query)
    ]);

    res.json({
      songs,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ message: 'Error fetching songs', error: error.message });
  }
});

// Get single song
router.get('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).lean();
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ message: 'Error fetching song', error: error.message });
  }
});

// Create new song
router.post('/songs', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, album, genre, duration, releaseDate, lyrics, explicit, featured } = req.body;
    
    // Handle file uploads
    const audioUrl = req.files.audio ? `/uploads/${req.files.audio[0].filename}` : undefined;
    const coverImage = req.files.coverImage ? `/uploads/${req.files.coverImage[0].filename}` : undefined;

    const song = new Song({
      title,
      artist,
      album,
      genre,
      duration: parseInt(duration, 10),
      releaseDate: releaseDate || new Date(),
      audioUrl,
      coverImage,
      lyrics: lyrics || '',
      explicit: explicit === 'true',
      featured: featured === 'true'
    });

    await song.save();
    res.status(201).json(song);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ message: 'Error creating song', error: error.message });
  }
});

// Update song
router.put('/songs/:id', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, album, genre, duration, releaseDate, lyrics, explicit, featured } = req.body;
    
    const updateData = {
      title,
      artist,
      album,
      genre,
      duration: parseInt(duration, 10),
      releaseDate,
      lyrics,
      explicit: explicit === 'true',
      featured: featured === 'true'
    };

    // Handle file uploads if files are included
    if (req.files.audio) {
      updateData.audioUrl = `/uploads/${req.files.audio[0].filename}`;
    }
    if (req.files.coverImage) {
      updateData.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }

    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json(song);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ message: 'Error updating song', error: error.message });
  }
});

// Delete song
router.delete('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // TODO: Delete associated audio and image files
    
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ message: 'Error deleting song', error: error.message });
  }
});

module.exports = router;
