import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";

// ===============================
// 1. Summary Report
// ===============================
export const getSummaryReport = async (req, res) => {
  const stats = await Booking.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const response = {
    totalBookings: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0,
  };

  stats.forEach((s) => {
    response.totalBookings += s.count;
    if (s._id === "Pending") response.pending = s.count;
    if (s._id === "Approved") response.approved = s.count;
    if (s._id === "Rejected") response.rejected = s.count;
    if (s._id === "Cancelled") response.cancelled = s.count;
  });

  res.json(response);
};

// ===============================
// 2. Room Usage Report
// ===============================
export const getRoomUsageReport = async (req, res) => {
  const totalRooms = await Room.countDocuments();

  const usage = await Booking.aggregate([
    { $match: { status: "Approved" } },
    {
      $group: {
        _id: "$room",
        usageCount: { $sum: 1 },
      },
    },
  ]);

  const detailed = await Promise.all(
    usage.map(async (u) => {
      const room = await Room.findById(u._id).populate("roomType");
      return {
        room: room?.name || "Unknown",
        roomType: room?.roomType instanceof RoomType ? room.roomType.name : room?.roomType?.name || "Unknown",
        usageCount: u.usageCount,
      };
    })
  );

  res.json({
    totalRooms,
    roomUsage: detailed,
  });
};

// ===============================
// 3. Daily Report
// ===============================
export const getDailyReport = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "date query param required (YYYY-MM-DD)" });
  }

  const bookings = await Booking.find({ date });

  res.json({
    date,
    totalBookings: bookings.length,
    bookings,
  });
};
