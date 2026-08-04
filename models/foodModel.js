const mongoose = require('mongoose');
  // 2. Define your schema and model

const FoodSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  price: { type: mongoose.Decimal128, required: true, get: v => v?.toString() },   // store "12.50"
  currency: { type: String, required: true, default: 'AUD' }
}, {
  toJSON:   { getters: true, virtuals: false, transform(_doc, ret){ delete ret.__v; return ret; } },
  toObject: { getters: true, virtuals: false }
});
module.exports = mongoose.model('Food', FoodSchema);