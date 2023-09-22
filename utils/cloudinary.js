// const cloudinaryModule = require("cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dycb3yukf",
  api_key: "982458441341694",
  api_secret: "7bGzmm3zLt2ZFCgELX6bBbwdyfM",
});

module.exports = cloudinary;
