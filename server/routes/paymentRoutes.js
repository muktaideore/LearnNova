import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getKey,
  createOrder,
  verifyPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/getKey", protect, getKey);
router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.get("/status", protect, getPaymentStatus);

export default router;