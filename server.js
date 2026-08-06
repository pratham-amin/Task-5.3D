const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/booksDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("error", err => {
  console.error("❌ MONGO ERROR:", err);
});

// Routes
const bookRoutes = require('./routes/books.routes');
app.use('/api/books', bookRoutes);   // ✅ mount with prefix

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
