const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  genre: [{ type: String }],
  origin: { type: String },
  yearsActive: { type: String },
  members: [{
    name: String,
    role: String
  }],
  website: { type: String },
  imageUrl: { type: String },
  // Spotify integration fields
  spotifyId: { type: String, unique: true, sparse: true },
  popularity: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    spotify: { type: String }
  },
  isFeatured: { type: Boolean, default: false },
  // Additional Spotify data with explicit schema
  spotifyData: {
    topTracks: [{
      name: { type: String, required: true },
      duration: { type: Number, required: true },
      album: { type: String, required: true },
      image: { type: String, default: '' }
    }],
    albums: [{
      name: { type: String, required: true },
      type: { type: String, required: true },
      releaseDate: { type: String, required: true },
      image: { type: String, default: '' }
    }],
    relatedArtists: [{
      name: { type: String, required: true },
      image: { type: String, default: '' },
      spotifyId: { type: String, required: true }
    }]
  }
}, {
  timestamps: true
});

// Index for better search performance
artistSchema.index({ name: 'text', genre: 'text' });
artistSchema.index({ spotifyId: 1 });
artistSchema.index({ popularity: -1 });
artistSchema.index({ followers: -1 });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
