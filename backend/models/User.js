import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed password
  role: {
    type: String,
    enum: ["Student", "Lecturer", "Admin"],
    required: true,
    default: "Student",
  },
});

export default mongoose.model("User", UserSchema);
