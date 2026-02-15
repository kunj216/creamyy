const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;
    let categoryCount = {
      chocolate: 0,
      fruit: 0,
      nutty: 0,
      vanilla: 0
    };

    const user = await User.findById(req.user._id);

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      totalAmount += product.price * item.quantity;

      // 🔥 ML Learning
      categoryCount[product.category] += item.quantity;

      // 🔥 STORE ORDER HISTORY
      user.orderHistory.push({
        productId: product._id,
        category: product.category,
        flavor: product.name,
        price: product.price,
        date: new Date()
      });
    }

    const order = await Order.create({
      user: user._id,
      items,
      totalAmount
    });

    // 🔥 Update Preferences
    user.preferences.chocolateScore += categoryCount.chocolate;
    user.preferences.fruitScore += categoryCount.fruit;
    user.preferences.nuttyScore += categoryCount.nutty;
    user.preferences.vanillaScore += categoryCount.vanilla;

    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
