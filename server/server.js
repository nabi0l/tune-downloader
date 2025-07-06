require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const songRoutes = require('./routes/songs');
const artistRoutes = require('./routes/artists');
const albumsRoutes = require('./routes/albums');
const cartRoutes = require('./routes/cart');
const newsletterRoutes = require('./routes/newsletter');
const searchRoutes = require('./routes/search');
const orderRoutes = require('./routes/orders');
const favoritesRoutes = require('./routes/favorites');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://tune-downloader.vercel.app',
    'https://tune-downloader-d9hh41acu-abigail-getachews-projects.vercel.app',
    'https://tune-downloader-*.vercel.app', // This will match all preview deployments
    'https://tune-downloader.onrender.com' // Add your Render deployment URL
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Seed all collections if any are empty
  try {
    const Album = require('./models/Album');
    const Artist = require('./models/Artist');
    const Song = require('./models/Song');
    const User = require('./models/User');

    const albumCount = await Album.countDocuments();
    const artistCount = await Artist.countDocuments();
    const songCount = await Song.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });

    console.log(`📊 Current database status:`);
    console.log(`   Albums: ${albumCount}`);
    console.log(`   Artists: ${artistCount}`);
    console.log(`   Songs: ${songCount}`);
    console.log(`   Admins: ${adminCount}`);

    if (albumCount === 0 || artistCount === 0 || songCount === 0 || adminCount === 0) {
      console.log('🌱 One or more collections are empty. Seeding all main collections...');
      const seedAlbums = require('./seedAlbums');
      const seedArtists = require('./seedArtists');
      const seedSongs = require('./seedSongs');
      const seedAdmins = require('./seedAdmins');
      const seedArtistsFromSpotify = require('./seedArtistsFromSpotify');

      console.log('🌱 Seeding artists...');
      await seedArtists();
      
      console.log('🌱 Seeding songs...');
      await seedSongs();
      
      console.log('🌱 Seeding albums...');
      await seedAlbums();
      
      console.log('🌱 Seeding admins...');
      await seedAdmins();
      
      console.log('🌱 Seeding artists from Spotify...');
      await seedArtistsFromSpotify();
      
      console.log('✅ All main collections seeded successfully!');
    } else {
      console.log('✅ All main collections already have data. No seeding needed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/favorites', favoritesRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Database status endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    const Album = require('./models/Album');
    const Artist = require('./models/Artist');
    const Song = require('./models/Song');
    const User = require('./models/User');

    const albumCount = await Album.countDocuments();
    const artistCount = await Artist.countDocuments();
    const songCount = await Song.countDocuments();
    const userCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });

    // Get sample data
    const sampleAlbums = await Album.find().limit(3);
    const sampleSongs = await Song.find().limit(3);
    const sampleArtists = await Artist.find().limit(3);

    res.json({
      status: 'OK',
      counts: {
        albums: albumCount,
        artists: artistCount,
        songs: songCount,
        users: userCount,
        admins: adminCount
      },
      samples: {
        albums: sampleAlbums.map(album => ({ title: album.title, artist: album.artist })),
        songs: sampleSongs.map(song => ({ title: song.title, artist: song.artist })),
        artists: sampleArtists.map(artist => ({ name: artist.name, genre: artist.genre }))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Force reseed endpoint
app.post('/api/force-reseed', async (req, res) => {
  try {
    console.log('🔄 Force reseeding database...');
    
    const Album = require('./models/Album');
    const Artist = require('./models/Artist');
    const Song = require('./models/Song');
    const User = require('./models/User');

    // Clear existing data
    await Album.deleteMany({});
    await Artist.deleteMany({});
    await Song.deleteMany({});
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️ Cleared all collections');

    // Import seeding functions
    const seedAlbums = require('./seedAlbums');
    const seedArtists = require('./seedArtists');
    const seedSongs = require('./seedSongs');
    const seedAdmins = require('./seedAdmins');
    const seedArtistsFromSpotify = require('./seedArtistsFromSpotify');

    // Seed all collections
    console.log('🌱 Seeding artists...');
    await seedArtists();
    
    console.log('🌱 Seeding songs...');
    await seedSongs();
    
    console.log('🌱 Seeding albums...');
    await seedAlbums();
    
    console.log('🌱 Seeding admins...');
    await seedAdmins();
    
    console.log('🌱 Seeding artists from Spotify...');
    await seedArtistsFromSpotify();

    // Get final counts
    const finalAlbumCount = await Album.countDocuments();
    const finalArtistCount = await Artist.countDocuments();
    const finalSongCount = await Song.countDocuments();
    const finalAdminCount = await User.countDocuments({ role: 'admin' });

    console.log('✅ Force reseed completed successfully!');
    
    res.json({
      status: 'success',
      message: 'Database reseeded successfully',
      counts: {
        albums: finalAlbumCount,
        artists: finalArtistCount,
        songs: finalSongCount,
        admins: finalAdminCount
      }
    });
  } catch (error) {
    console.error('❌ Error during force reseed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a friendly root route
app.get('/', (req, res) => {
  res.send('API is running! Welcome to Tune Downloader backend.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

module.exports = server;