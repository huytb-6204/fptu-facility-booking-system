const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus", required: true },
});

module.exports = mongoose.model("Building", BuildingSchema);
