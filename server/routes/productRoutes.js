const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProducts,
  createProduct,
  bulkCreateProducts,
  getRecommendations,
  getTopSellingProducts,
  getCollaborativeRecommendations,
  getHybridRecommendations
} = require("../controllers/productController");

/* ======================================================
   PUBLIC ROUTES
====================================================== */

// Get all products
router.get("/", getProducts);

// Get top selling products
router.get("/top-selling", getTopSellingProducts);

// Create single product
router.post("/", createProduct);

// Bulk insert products
router.post("/bulk", bulkCreateProducts);


/* ======================================================
   PROTECTED RECOMMENDATION ROUTES
====================================================== */

// Content-Based Recommendation
router.get("/recommendations", protect, getRecommendations);

// Collaborative Filtering (KNN)
router.get("/collaborative", protect, getCollaborativeRecommendations);

// Hybrid Recommendation System
router.get("/hybrid", protect, getHybridRecommendations);


module.exports = router;
