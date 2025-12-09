const bookingService = require("../services/bookingService");

// CREATE Booking
exports.createBooking = async (req, res) => {
  try {
    const result = await bookingService.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL bookings
exports.getAllBookings = async (req, res) => {
  const list = await bookingService.getAll();
  res.json(list);
};

// APPROVE
exports.approveBooking = async (req, res) => {
  try {
    const result = await bookingService.approve(req.params.id, req.body.approver);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// REJECT
exports.rejectBooking = async (req, res) => {
  try {
    const result = await bookingService.reject(req.params.id, req.body.approver);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
