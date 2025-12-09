const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
});

module.exports = mongoose.model("Feature", FeatureSchema);
