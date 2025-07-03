const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  audioUrl: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: 'default-cover.jpg'
  },
  playCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // For trending calculation
  trendScore: {
    type: Number,
    default: 0
  },
  lastPlayed: {
    type: Date,
    default: Date.now
  },
  isSingle: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 1.29,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
songSchema.index({ trendScore: -1 });
songSchema.index({ 'lastPlayed': -1 });

// Method to update trend score
songSchema.methods.updateTrendScore = function() {
  // This is a simple trending algorithm - you can adjust the weights as needed
  const now = new Date();
  const hoursSinceLastPlay = (now - this.lastPlayed) / (1000 * 60 * 60);
  
  // More recent plays have higher weight
  const recencyWeight = Math.max(0, 1 - (hoursSinceLastPlay / 168)); // 1 week window
  
  // More popular songs get a boost
  const popularityWeight = Math.log10(this.playCount + 1);
  
  // Likes also contribute to trending
  const likeWeight = Math.log10(this.likes.length + 1);
  
  // Combine weights (you can adjust these coefficients)
  this.trendScore = (recencyWeight * 0.4) + (popularityWeight * 0.4) + (likeWeight * 0.2);
  
  return this.save();
};

// Method to increment play count and update trend score
songSchema.methods.recordPlay = async function() {
  this.playCount += 1;
  this.lastPlayed = new Date();
  await this.updateTrendScore();
  return this.save();
};

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
