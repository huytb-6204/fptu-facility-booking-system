import mongoose from "mongoose";

    const BookingStatusHistorySchema = new mongoose.Schema({
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Cancelled"], required: true },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const ApprovalSchema = new mongoose.Schema({
  approver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  decision: { type: String, enum: ["Approved", "Rejected"], required: true },
  decisionDate: { type: Date, default: Date.now },
});

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  date: String,
  startTime: String,
  endTime: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Cancelled"], default: "Pending" },
  approval: ApprovalSchema,
  statusHistory: [BookingStatusHistorySchema],
});

export default mongoose.model("Booking", BookingSchema);
