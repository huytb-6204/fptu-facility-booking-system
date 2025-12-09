const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  building: { type: mongoose.Schema.Types.ObjectId, ref: "Building", required: true },
  roomType: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType", required: true },
  capacity: Number,
  features: [
    {
      feature: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" },
      value: String, // optional (e.g., projector brand)
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
