import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  cancelBooking,
  approveBooking,
  rejectBooking,
} from "../controllers/bookingController.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, requireRole("Student", "Lecturer"), createBooking);
router.get("/", authMiddleware, requireRole("Student", "Lecturer", "Admin"), getAllBookings);
router.put("/cancel/:id", authMiddleware, requireRole("Student"), cancelBooking);   // Student cancel
router.put("/approve/:id", authMiddleware, requireRole("Lecturer", "Admin"), approveBooking);  // Lecturer/Admin approve
router.put("/reject/:id", authMiddleware, requireRole("Lecturer", "Admin"), rejectBooking);   // Lecturer/Admin reject

export default router;
