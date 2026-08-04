// controllers/books.controller.js

const bookService = require('../services/books.services');

exports.getAllBooks = (_req, res) => {
  const items = bookService.getAllBooks();
  res.status(200).json({
    statusCode: 200,
    data: items,
    message: "Books retrieved"
  });
};

exports.getBookById = (req, res) => {
  const id = req.params.id;
  const book = bookService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      statusCode: 404,
      message: "Book not found"
    });
  }

  res.status(200).json({
    statusCode: 200,
    data: book,
    message: "Book retrieved"
  });
};
