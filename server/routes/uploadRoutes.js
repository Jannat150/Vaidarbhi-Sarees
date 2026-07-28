import express from "express";
import { uploadImages } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, admin, upload.array("images", 6), uploadImages);

export default router;
