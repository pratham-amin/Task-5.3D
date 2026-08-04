const bookService = require('../services/books.services');

exports.getAllBooks = async (_req, res) => {
  const items = await bookService.getAllBooks();
  res.status(200).json({
    statusCode: 200,
    data: items,
    message: "Books retrieved"
  });
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  const book = await bookService.getBookById(id);

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
