const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "id is required"],
    match: [/^[A-Za-z0-9]+$/, "id must be alphanumeric with no spaces"],
    immutable: true
  },

  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [2, "title must be at least 2 characters"],
    maxlength: [100, "title cannot exceed 100 characters"]
  },

  author: {
    type: String,
    required: [true, "author is required"],
    minlength: [2, "author must be at least 2 characters"],
    maxlength: [60, "author cannot exceed 60 characters"]
  },

  year: {
    type: Number,
    required: [true, "year is required"],
    min: [1500, "year cannot be earlier than 1500"],
    max: [new Date().getFullYear(), "year cannot be in the future"]
  },

  genre: {
    type: String,
    required: [true, "genre is required"],
    enum: {
      values: ["Classic", "Fantasy", "Science Fiction", "Historical Fiction"],
      message: "genre must be one of: Classic, Fantasy, Science Fiction, Historical Fiction"
    }
  },

  summary: {
    type: String,
    maxlength: [500, "summary cannot exceed 500 characters"]
  },

  price: {
    type: mongoose.Decimal128,
    required: [true, "price is required"],
    validate: {
      validator: (v) => {
        const num = parseFloat(v.toString());
        return num > 0 && num < 1000;
      },
      message: "price must be between 0 and 1000 AUD"
    }
  }
});

module.exports = mongoose.model("Book", BookSchema);
