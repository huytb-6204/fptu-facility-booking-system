import mongoose from "mongoose";

const CampusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
});

export default mongoose.model("Campus", CampusSchema);
