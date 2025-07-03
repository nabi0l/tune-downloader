const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  trackNumber: { type: Number, required: true }
}, { _id: false });

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: [{ type: String }],
  type: { type: String, required: true },
  isSingle: { type: Boolean, default: false },
  coverImage: { type: String },
  price: { type: Number, required: true },
  tracks: [trackSchema],
  label: { type: String },
  totalDuration: { type: Number },
  popularity: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  categories: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
