import mongoose from "mongoose";

const RoomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

export default mongoose.model("RoomType", RoomTypeSchema);
