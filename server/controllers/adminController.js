const User = require("../models/User");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
