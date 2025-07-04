const mongoose = require('mongoose');
const Song = require('./server/models/Song');
require('dotenv').config();

async function getSongId() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const song = await Song.findOne();
    if (song) {
      console.log('Found song:', song.title, 'by', song.artist);
      console.log('Song ID:', song._id);
    } else {
      console.log('No songs found in database');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

getSongId(); 