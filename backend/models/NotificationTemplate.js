import mongoose from "mongoose";

const NotificationTemplateSchema = new mongoose.Schema({
  type: { type: String, enum: ["Email", "SMS"], required: true },
  subject: String,
  content: String,
});

export default mongoose.model("NotificationTemplate", NotificationTemplateSchema);
