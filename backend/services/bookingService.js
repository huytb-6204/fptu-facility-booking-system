const conflictChecker = require("./conflictChecker");
const Booking = require("../models/Booking");

exports.create = async (data) => {
  const { room, date, startTime, endTime } = data;

  // 1. Check conflict using ConflictChecker
  const conflict = await conflictChecker.hasConflict({ room, date, startTime, endTime });

  if (conflict) {
    throw new Error("Time conflict – room is already booked for this timeslot.");
  }

  // 2. Create booking
  const booking = await Booking.create(data);

  // 3. Push history
  booking.statusHistory.push({
    status: "Pending",
    changedBy: data.user
  });

  await booking.save();
  return booking;
};  
