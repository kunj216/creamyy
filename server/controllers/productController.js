const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};



exports.bulkCreateProducts = async (req, res) => {
  try {
    const products = req.body;

    const insertedProducts = await Product.insertMany(products, {
      ordered: false   // continues inserting even if one fails
    });

    res.status(201).json({
      message: "Products inserted successfully",
      insertedCount: insertedProducts.length,
      products: insertedProducts
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Some products already exist (duplicates skipped)."
      });
    }

    res.status(400).json({ message: error.message });
  }
};


const User = require("../models/User");

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const preferences = user.preferences;

    // Find highest preference category
    const preferredCategory = Object.keys(preferences).reduce((a, b) =>
      preferences[a] > preferences[b] ? a : b
    );

    // Remove "Score" from key
    const category = preferredCategory.replace("Score", "");

    const recommendedProducts = await Product.find({ category });

    res.json({
      preferredCategory: category,
      recommendations: recommendedProducts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Order = require("../models/Order");

exports.getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 4 }
    ]);

    const productIds = topProducts.map(item => item._id);

    const products = await Product.find({
      _id: { $in: productIds }
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const { cosineSimilarity } = require("../utils/similarity");

exports.getCollaborativeRecommendations = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const allUsers = await User.find({
      _id: { $ne: currentUser._id }
    });

    const currentVector = [
      currentUser.preferences.chocolateScore,
      currentUser.preferences.fruitScore,
      currentUser.preferences.nuttyScore,
      currentUser.preferences.vanillaScore
    ];

    // Calculate similarity with other users
    const similarities = allUsers.map(user => {
      const userVector = [
        user.preferences.chocolateScore,
        user.preferences.fruitScore,
        user.preferences.nuttyScore,
        user.preferences.vanillaScore
      ];

      return {
        user,
        similarity: cosineSimilarity(currentVector, userVector)
      };
    });

    // Sort descending
    similarities.sort((a, b) => b.similarity - a.similarity);

    // Take top K users
    const K = 3;
    const nearestUsers = similarities.slice(0, K);

    // Collect products from nearest users' orderHistory
    const recommendedProductIds = new Set();

    nearestUsers.forEach(entry => {
      entry.user.orderHistory.forEach(order => {
        recommendedProductIds.add(order.productId.toString());
      });
    });

    // Remove products already purchased by current user
    const purchasedIds = new Set(
      currentUser.orderHistory.map(o => o.productId.toString())
    );

    const finalProductIds = [...recommendedProductIds].filter(
      id => !purchasedIds.has(id)
    );

    const recommendedProducts = await Product.find({
      _id: { $in: finalProductIds }
    });

    res.json({
      type: "Collaborative Filtering",
      recommendations: recommendedProducts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ======================================================
   HYBRID RECOMMENDATION SYSTEM
====================================================== */

exports.getHybridRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // -------- Content-Based --------
    const preferences = user.preferences;

    const preferredCategory = Object.keys(preferences).reduce((a, b) =>
      preferences[a] > preferences[b] ? a : b
    );

    const category = preferredCategory.replace("Score", "");

    const contentProducts = await Product.find({ category });

    // -------- Collaborative --------
    const allUsers = await User.find({
      _id: { $ne: user._id }
    });

    const currentVector = [
      user.preferences.chocolateScore,
      user.preferences.fruitScore,
      user.preferences.nuttyScore,
      user.preferences.vanillaScore
    ];

    const similarities = allUsers.map(otherUser => {
      const userVector = [
        otherUser.preferences.chocolateScore,
        otherUser.preferences.fruitScore,
        otherUser.preferences.nuttyScore,
        otherUser.preferences.vanillaScore
      ];

      return {
        user: otherUser,
        similarity: cosineSimilarity(currentVector, userVector)
      };
    });

    similarities.sort((a, b) => b.similarity - a.similarity);

    const K = 3;
    const nearestUsers = similarities.slice(0, K);

    const recommendedProductIds = new Set();

    nearestUsers.forEach(entry => {
      entry.user.orderHistory.forEach(order => {
        recommendedProductIds.add(order.productId.toString());
      });
    });

    const purchasedIds = new Set(
      user.orderHistory.map(o => o.productId.toString())
    );

    const collaborativeIds = [...recommendedProductIds].filter(
      id => !purchasedIds.has(id)
    );

    const collaborativeProducts = await Product.find({
      _id: { $in: collaborativeIds }
    });

    // -------- Hybrid Merge --------
    const productMap = new Map();

    // Content weight = 0.6
    contentProducts.forEach(product => {
      productMap.set(product._id.toString(), {
        product,
        score: 0.6
      });
    });

    // Collaborative weight = 0.4
    collaborativeProducts.forEach(product => {
      const id = product._id.toString();

      if (productMap.has(id)) {
        productMap.get(id).score += 0.4;
      } else {
        productMap.set(id, {
          product,
          score: 0.4
        });
      }
    });

    const finalRecommendations = [...productMap.values()]
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.product);

    res.json({
      type: "Hybrid Recommendation System",
      recommendations: finalRecommendations
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
