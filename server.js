// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");

const app = express();
// Middleware to parse JSON data
app.use(express.json());
const PORT = process.env.PORT || 3001;

// Set up CORS for cross-origin requests
app.use(cors());

// Set up MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cloudinary-upload")
  .then(() => {
    console.log("Connected TO DB");
  })
  .catch((error) => {
    console.log("Not connected", error);
  });

// Set up routes here (see Step 4)
app.use("/api", uploadRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal server error" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
