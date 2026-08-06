const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/books.controller');

// ✅ Define relative paths
router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getBookById);

router.post('/', BooksController.createBook);
router.put('/:id', BooksController.updateBook);

module.exports = router;
