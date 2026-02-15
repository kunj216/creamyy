const mongoose = require("mongoose");
const { CATEGORIES } = require("../utils/constants");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: CATEGORIES
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
