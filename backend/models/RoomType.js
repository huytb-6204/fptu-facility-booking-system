const mongoose = require("mongoose");

const RoomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

module.exports = mongoose.model("RoomType", RoomTypeSchema);
