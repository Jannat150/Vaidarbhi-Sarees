import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
  cancelOrder,
} from "../controllers/orderController.js";

import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

// User
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin
router.get("/stats", protect, admin, getOrderStats);
router.get("/", protect, admin, getAllOrders);

// User
router.put("/:id/cancel", protect, cancelOrder);

// Admin
router.put("/:id/status", protect, admin, updateOrderStatus);

// IMPORTANT: Keep this LAST
router.get("/:id", protect, getOrderById);

export default router;