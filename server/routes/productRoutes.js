import express from "express";
import {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/id/:id", protect, admin, getProductById);
router.get("/:slug", getProductBySlug);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
