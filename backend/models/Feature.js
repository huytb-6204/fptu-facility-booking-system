import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
});

export default mongoose.model("Feature", FeatureSchema);
