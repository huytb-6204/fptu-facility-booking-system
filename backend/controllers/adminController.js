import Booking from "../models/Booking.js";

export const getDashboard = async (_req, res) => {
  try {
    const [total, pending, approved, rejected, cancelled, latestPending] =
      await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: "Pending" }),
        Booking.countDocuments({ status: "Approved" }),
        Booking.countDocuments({ status: "Rejected" }),
        Booking.countDocuments({ status: "Cancelled" }),
        Booking.find({ status: "Pending" })
          .populate("room user")
          .sort({ _id: -1 })
          .limit(5),
      ]);

    res.json({
      total,
      pending,
      approved,
      rejected,
      cancelled,
      latestPending,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to load dashboard" });
  }
};
