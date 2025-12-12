import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },
});

export default mongoose.model("Building", BuildingSchema);
