const express = require("express");
const router = express.Router();
const File = require("../models/File");
const uploadToCloudinary = require("../utils/Cloudinary");
const upload = require("../middleware/Upload");
const authenticate = require("../middleware/Auth");


router.post("/upload", authenticate, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file provided" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "test");

    const file = new File({
      filename: req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
      uploadedby: req.user.id,
      size: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname,
    });

    await file.save();
    res.status(201).json(file);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ msg: "File upload failed" });
  }
});

// Get all files uploaded by the user
router.get("/", authenticate, async (req, res) => {
  try {
    const files = await File.find({ uploadedby: req.user.id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ msg: "Cannot fetch files" });
  }
});

// Delete a file by ID
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    const cloudinary = require("cloudinary").v2;
    await cloudinary.uploader.destroy(file.public_id, { resource_type: "auto" });

    await file.remove();
    res.json({ msg: "File deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "File deletion failed" });
  }
});

module.exports = router;
