const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Creamyy API Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log(err));


const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);

const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

const cors = require("cors");
app.use(cors());
