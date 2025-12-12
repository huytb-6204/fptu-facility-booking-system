import Booking from "../models/Booking.js";


export const hasConflict = async ({ room, date, startTime, endTime }) => {
  const conflict = await Booking.findOne({
    room,
    date,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  return !!conflict;
};
