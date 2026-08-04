const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/books.controller');

router.get('/api/books', BooksController.getAllBooks);
router.get('/api/books/:id', BooksController.getBookById);

module.exports = router;
