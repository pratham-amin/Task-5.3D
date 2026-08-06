const bookService = require('../services/books.services');

// GET ALL
exports.getAllBooks = async (_req, res) => {
  try {
    const items = await bookService.getAllBooks();
    return res.status(200).json({
      statusCode: 200,
      data: items,
      message: "Books retrieved"
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// GET BY ID
exports.getBookById = async (req, res) => {
  try {
    const item = await bookService.getBookById(req.params.id);
    if (!item) {
      return res.status(404).json({ statusCode: 404, message: "Book not found" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: item,
      message: "Book retrieved"
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// CREATE
exports.createBook = async (req, res) => {
  try {
    const result = await bookService.createBook(req.body);
    return res.status(201).json({
      statusCode: 201,
      data: result,
      message: "Book created successfully"
    });
  } catch (err) {
    const status = err.code || 400;
    return res.status(status).json({ statusCode: status, message: err.message });
  }
};


// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const result = await bookService.updateBook(req.params.id, req.body);
    return res.status(200).json({
      statusCode: 200,
      data: result,
      message: "Book updated successfully"
    });
  } catch (err) {
    const status = err.code || 400;
    return res.status(status).json({ statusCode: status, message: err.message });
  }
};
