const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const campusRoutes = require("./routes/campus.route");
const buildingRoutes = require("./routes/building.route");
const roomTypeRoutes = require("./routes/roomType.route");
const featureRoutes = require("./routes/feature.route");
const roomRoutes = require("./routes/room.route");
const userRoutes = require("./routes/user.route");
const bookingRoutes = require("./routes/booking.route");
const notificationTemplateRoutes = require("./routes/notificationTemplate.route");
const notificationLogRoutes = require("./routes/notificationLog.route");

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/facility_booking")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Route test
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/campus", campusRoutes);
app.use("/building", buildingRoutes);
app.use("/roomType", roomTypeRoutes);
app.use("/feature", featureRoutes);
app.use("/room", roomRoutes);
app.use("/user", userRoutes);
app.use("/booking", bookingRoutes);
app.use("/notification-template", notificationTemplateRoutes);
app.use("/notification-log", notificationLogRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
