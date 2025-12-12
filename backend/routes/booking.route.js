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

// Student + Lecturer can create booking
router.post("/", authMiddleware, requireRole("Student", "Lecturer"), createBooking);

// All roles allowed to view (optional: Student only sees his own)
router.get("/", authMiddleware, requireRole("Student", "Lecturer", "Admin"), getAllBookings);

// Student + Lecturer cancel their OWN bookings
router.put("/cancel/:id", authMiddleware, requireRole("Student", "Lecturer"), cancelBooking);

// Only Admin approves bookings
router.put("/approve/:id", authMiddleware, requireRole("Admin"), approveBooking);

// Only Admin rejects bookings
router.put("/reject/:id", authMiddleware, requireRole("Admin"), rejectBooking);

export default router;
