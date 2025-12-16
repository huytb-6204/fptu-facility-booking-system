import * as bookingService from "../services/bookingService.js";

// CREATE Booking
export const createBooking = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      user: req.user._id, // always trust authenticated user
    };
    const result = await bookingService.create(payload);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL bookings
export const getAllBookings = async (req, res) => {
  const list = await bookingService.getAll();
  res.json(list);
};


// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const result = await bookingService.cancel(req.params.id, req.user._id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// APPROVE BOOKING
export const approveBooking = async (req, res) => {
  try {
    const result = await bookingService.approve(req.params.id, req.user._id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// REJECT BOOKING
export const rejectBooking = async (req, res) => {
  try {
    const result = await bookingService.reject(req.params.id, req.user._id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
