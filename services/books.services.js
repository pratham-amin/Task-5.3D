const Book = require('../models/books.models');

// Allowed fields
const allowedFields = ["id", "title", "author", "year", "genre", "summary", "price"];

// Reject unknown fields
function rejectUnknownFields(payload) {
  const keys = Object.keys(payload);
  for (const key of keys) {
    if (!allowedFields.includes(key)) {
      throw new Error(`Unknown field: ${key}`);
    }
  }
}

// GET ALL
exports.getAllBooks = async () => {
  const books = await Book.find({}).lean();

  return books.map(b => ({
    ...b,
    price: parseFloat(b.price.toString())
  }));
};

// GET BY ID
exports.getBookById = async (id) => {
  const b = await Book.findOne({ id }).lean();
  if (!b) return null;

  return {
    ...b,
    price: parseFloat(b.price.toString())
  };
};

// CREATE
exports.createBook = async (payload) => {
  rejectUnknownFields(payload);

  const exists = await Book.findOne({ id: payload.id });
  if (exists) {
    const err = new Error("Duplicate id");
    err.code = 409;
    throw err;
  }

  try {
    const created = await Book.create(payload);
    const obj = created.toObject();
    obj.price = parseFloat(obj.price.toString());
    return obj;
  } catch (err) {
    throw new Error(err.message);
  }
};

// UPDATE
exports.updateBook = async (id, payload) => {
  rejectUnknownFields(payload);

  if (payload.id && payload.id !== id) {
    const err = new Error("id cannot be changed");
    err.code = 400;
    throw err;
  }

  const existing = await Book.findOne({ id });
  if (!existing) {
    const err = new Error("Book not found");
    err.code = 404;
    throw err;
  }

  try {
    Object.assign(existing, payload);
    const updated = await existing.save();
    const obj = updated.toObject();
    obj.price = parseFloat(obj.price.toString());
    return obj;
  } catch (err) {
    throw new Error(err.message);
  }
};
