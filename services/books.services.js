const Book = require('../models/books.models');

async function getAllBooks() {
  const books = await Book.find({}).lean();

  // Convert Decimal128 to string
  return books.map(b => ({
    ...b,
    price: b.price.toString()
  }));
}

async function getBookById(id) {
  const b = await Book.findOne({ id }).lean();

  if (!b) return null;

  return {
    ...b,
    price: b.price.toString()
  };
}

module.exports = {
  getAllBooks,
  getBookById
};
