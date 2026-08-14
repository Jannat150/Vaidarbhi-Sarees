import express from "express";
import {
  createContact,
  getAllContacts,
  getMyContacts,
  getContactById,
  updateContact,
  deleteContact,
  replyToContact,
  updateReply,
  deleteReply,
} from "../controllers/contactController.js";

import { protect, optionalProtect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.post("/", optionalProtect, createContact);
router.get("/", protect, admin, getAllContacts);
router.get("/my", protect, getMyContacts);
router.get("/:id", protect, admin, getContactById);
router.put("/:id", protect, admin, updateContact);
router.delete("/:id", protect, admin, deleteContact);
router.put("/:id/reply", protect, admin, replyToContact);
router.put("/:id/reply/update", protect, admin, updateReply);
router.delete("/:id/reply", protect, admin, deleteReply);

export default router;
