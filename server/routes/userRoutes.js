import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addAddress,
  getAllUsers,
  getUserOrders,
} from "../controllers/userController.js";

import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// User Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/addresses", protect, addAddress);

// Admin Routes
router.get("/", protect, admin, getAllUsers);

router.get(
  "/:id/orders",
  protect,
  admin,
  getUserOrders
);

export default router;