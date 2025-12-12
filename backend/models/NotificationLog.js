import mongoose from "mongoose";

const NotificationLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  channel: { type: String, enum: ["Email", "SMS"], required: true },
  content: String,
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.model("NotificationLog", NotificationLogSchema);
