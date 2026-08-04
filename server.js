// server.js

const express = require('express');
const app = express();
const path = require('path');

const bookRoutes = require('./routes/books.routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bookRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
