import { Router } from "express";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";
import {
  getSummaryReport,
  getRoomUsageReport,
  getDailyReport,
} from "../controllers/reportController.js";

const router = Router();

// Chỉ Admin được xem báo cáo
router.get("/summary", authMiddleware, requireRole("Admin"), getSummaryReport);
router.get("/room-usage", authMiddleware, requireRole("Admin"), getRoomUsageReport);
router.get("/daily", authMiddleware, requireRole("Admin"), getDailyReport);

export default router;
