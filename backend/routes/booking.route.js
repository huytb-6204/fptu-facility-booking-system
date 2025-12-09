const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.put("/approve/:id", bookingController.approveBooking);
router.put("/reject/:id", bookingController.rejectBooking);

module.exports = router;
