const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const Content = require("../models/content");
const multer = require("multer");

// Set up Multer for handling file uploads
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.fields([{ name: "thumbnail" }, { name: "video" }]), async (req, res) => {
  const { title, description } = req.body;

  try {
    const thumbnailFile = req.files["thumbnail"][0];
    const videoFile = req.files["video"][0];

    if (thumbnailFile && videoFile) {
      const uploadThumbnail = await cloudinary.uploader.upload(thumbnailFile.path, {
        upload_preset: "thumbnail", // Use the correct thumbnail preset
      });

      const uploadVideo = await cloudinary.uploader.upload(videoFile.path, {
        upload_preset: "video", // Use the correct video preset
        resource_type: "video", // Specify that you're uploading a video
      });

      if (uploadThumbnail && uploadVideo) {
        const content = new Content({
          title,
          description,
          thumbnail: {
            contentType: thumbnailFile.mimetype,
            cloudinaryUrl: uploadThumbnail.secure_url,
          },
          video: {
            contentType: videoFile.mimetype,
            cloudinaryUrl: uploadVideo.secure_url,
          },
        });

        const savedContent = await content.save();
        res.status(200).json(savedContent);
      }
    } else {
      res.status(400).json({ message: "Both thumbnail and video files are required." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
