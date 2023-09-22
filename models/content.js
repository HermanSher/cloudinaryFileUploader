const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: {
    data: Buffer,
    contentType: String,
    cloudinaryUrl: String,
  },
  video: {
    data: Buffer, // Store binary video data
    contentType: String, // Store the video content type
    cloudinaryUrl: String, // Store the Cloudinary URL for the video
  },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
