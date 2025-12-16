import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";
import { getDashboard } from "../controllers/adminController.js";

const router = Router();

router.get("/dashboard", authMiddleware, requireRole("Admin"), getDashboard);

export default router;
