const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ["Student", "Lecturer", "Admin"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
