// MUST BE FIRST – load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import campusRoutes from "./routes/campus.route.js";
import buildingRoutes from "./routes/building.route.js";
import roomTypeRoutes from "./routes/roomType.route.js";
import featureRoutes from "./routes/feature.route.js";
import roomRoutes from "./routes/room.route.js";
import userRoutes from "./routes/user.route.js";
import bookingRoutes from "./routes/booking.route.js";
import notificationTemplateRoutes from "./routes/notificationTemplate.route.js";
import notificationLogRoutes from "./routes/notificationLog.route.js";
import authRoutes from "./routes/auth.route.js";
import reportRoutes from "./routes/report.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Debug middleware – để kiểm tra yêu cầu có vào route không
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.path}`);
  next();
});

// ==========================
// CONNECT MONGODB
// ==========================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ==========================
// ROUTES
// ==========================

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/auth", authRoutes);
app.use("/campus", campusRoutes);
app.use("/building", buildingRoutes);
app.use("/roomType", roomTypeRoutes);
app.use("/feature", featureRoutes);
app.use("/room", roomRoutes);
app.use("/user", userRoutes);
app.use("/booking", bookingRoutes);
app.use("/notification-template", notificationTemplateRoutes);
app.use("/notification-log", notificationLogRoutes);
app.use("/reports", reportRoutes);
app.use("/reports", reportRoutes);

// ==========================
// START SERVER
// ==========================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
