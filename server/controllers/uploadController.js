import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Upload Config:");
console.log(cloudinary.config());

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "saree-ecommerce/products",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// @desc Upload one or more product images
// @route POST /api/upload
// @access Private/Admin
export const uploadImages = async (req, res) => {
  try {
    console.log("Files Received:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const results = [];

    for (const file of req.files) {
      const uploaded = await streamUpload(file.buffer);
      results.push(uploaded.secure_url);
    }

    res.status(201).json({
      urls: results,
    });
  } catch (error) {
    console.error("========== CLOUDINARY UPLOAD ERROR ==========");
    console.error(error);

    res.status(500).json({
      message: error.message || "Image upload failed",
    });
  }
};