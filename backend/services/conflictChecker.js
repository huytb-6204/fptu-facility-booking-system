const Booking = require("../models/Booking");

exports.hasConflict = async ({ room, date, startTimeBooking, endTimeBooking }) => {
const conflict = await Booking.findOne({
  room: room,
  date: date,
  startTime: { $lt: endTimeBooking },
  endTime: { $gt: startTimeBooking }
});

  return conflict ? true : false;
};
