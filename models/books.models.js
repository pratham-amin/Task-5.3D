 const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  author: String,
  year: Number,
  genre: String,
  summary: String,
  price: mongoose.Decimal128
});

module.exports = mongoose.model('Book', BookSchema);
