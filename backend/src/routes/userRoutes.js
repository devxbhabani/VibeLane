import express from "express";
import {
	getProfile,
	updateProfile,
	getUserOrders,
	createOrder,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId/profile", getProfile);
router.put("/:userId/profile", updateProfile);
router.get("/:userId/orders", getUserOrders);
router.post("/orders", createOrder);

export default router;
