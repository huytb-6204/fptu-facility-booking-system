const mongoose = require("mongoose");

const CampusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
});

module.exports = mongoose.model("Campus", CampusSchema);
