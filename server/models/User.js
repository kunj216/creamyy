const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orderHistory: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      category: String,
      flavor: String,
      price: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  preferences: {
    chocolateScore: { type: Number, default: 0 },
    fruitScore: { type: Number, default: 0 },
    nuttyScore: { type: Number, default: 0 },
    vanillaScore: { type: Number, default: 0 },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
