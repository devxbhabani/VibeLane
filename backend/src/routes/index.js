import express from "express";
import { checkHealth } from "../controllers/healthController.js";
import productRoutes from "./productRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Health check route
router.get("/health", checkHealth);

// API routes
router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
