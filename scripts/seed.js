const mongoose = require('mongoose');
const Book = require('../models/books.models');

mongoose.connect('mongodb://localhost:27017/booksDB');

const sampleData = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy...",
    price: mongoose.Types.Decimal128.fromString("29.99")
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall...",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    summary: "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations...",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "In a ruined Italian villa at the end of WWII, four strangers confront memory and identity...",
    price: mongoose.Types.Decimal128.fromString("25.39")
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma...",
    price: mongoose.Types.Decimal128.fromString("31.99")
  }
];

(async () => {
  try {
    await Book.deleteMany({});
    await Book.insertMany(sampleData);
    console.log("Seeded 5 books.");
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
