const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const PresentationSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  authors: { type: [String], required: true },
  dateOfPublishment: { type: Date, default: Date.now },
  slides: [SlideSchema],
});

module.exports = mongoose.model('Presentation', PresentationSchema);