const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: String,
  description: String,
  date: Date,
  location: {
    type: { type: String },
    coordinates: [Number]
  }
});

module.exports = mongoose.model('Photo', photoSchema);