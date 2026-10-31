import express from "express";
import { checkHealth } from "../controllers/healthController.js";
import productRoutes from "./productRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

// Health check route
router.get("/health", checkHealth);

// API routes
router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export default router;
