import express from "express";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
	getAllOrders,
	updateOrderStatus,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes here are protected and require admin privileges
router.use(protect, authorizeAdmin);

// GET all orders for all customers (admin only)
router.get("/orders", getAllOrders);

// PUT update order status
router.put("/orders/:id/status", updateOrderStatus);

export default router;

