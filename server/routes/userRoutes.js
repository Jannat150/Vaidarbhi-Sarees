import express from "express";
import {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  firebaseAuth,
  getUserProfile,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getAllUsers,
  getUserOrders,
} from "../controllers/userController.js";

import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/firebase-auth", verifyFirebaseToken, firebaseAuth);

// User Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/addresses", protect, addAddress);
router.put("/addresses/:addressId", protect, updateAddress);
router.delete("/addresses/:addressId", protect, deleteAddress);
router.put("/addresses/:addressId/default", protect, setDefaultAddress);

// Admin Routes
router.get("/", protect, admin, getAllUsers);

router.get(
  "/:id/orders",
  protect,
  admin,
  getUserOrders
);

export default router;