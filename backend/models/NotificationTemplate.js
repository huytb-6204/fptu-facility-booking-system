const mongoose = require("mongoose");

const NotificationTemplateSchema = new mongoose.Schema({
  type: { type: String, enum: ["Email", "SMS"], required: true },
  subject: String,
  content: String,
});

module.exports = mongoose.model("NotificationTemplate", NotificationTemplateSchema);
