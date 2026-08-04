const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();


mongoose.connect('mongodb://localhost:27017/booksDB');

const bookRoutes = require('./routes/books.routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bookRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
