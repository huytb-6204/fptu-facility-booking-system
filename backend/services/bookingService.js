import { hasConflict } from "./conflictChecker.js";
import Booking from "../models/Booking.js";
import { io } from "../server.js";

export const getAll = async () => {
  const bookings = await Booking.find()
    .populate("user")
    .populate("room")
    .populate("approval.approver")
    .populate("statusHistory.changedBy");

  return bookings;
};



export const create = async (data) => {
  const { room, date, startTime, endTime } = data;

  // 1. Check conflict using ConflictChecker
  const conflict = await hasConflict({ room, date, startTime, endTime });

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


export const cancel = async (id, userId) => {
  const booking = await Booking.findById(id);
  if(!booking) {
    throw new Error("Booking not found.");
  }

  // Logic just for only owner cancel booking
  if(String(booking.user) !== String(userId)) {
    throw new Error("You are not allowed to cancel this booking");
  }

    if (booking.status !== "Pending") {
    throw new Error("Only pending bookings can be cancelled");
  }

  // Update status to 'Cancelled' and push to history
  booking.status =  "Cancelled";
  
  booking.statusHistory.push({ // push to history
    status: "Cancelled",
    changedBy: userId
  });

  await booking.save();
  return booking;
}


export const approve = async (id, approverId) => {
  const booking = await Booking.findById(id).populate("user room");
  if (!booking) {
    throw new Error("Booking not found.");
  }

  // Only pending bookings can be approved
  if (booking.status !== "Pending") {
    throw new Error("Only pending bookings can be approved.");
  }

  // Update booking status
  booking.status = "Approved";
  
  // Update approval object
  booking.approval = {
    approver: approverId,
    decision: "Approved",
    decisionDate: new Date()
  };

  // Push to history
  booking.statusHistory.push({
    status: "Approved",
    changedBy: approverId
  });

  await booking.save();
  io.emit("bookingStatusUpdated", booking);

  return booking;
};



export const reject = async (id, approverId) => {
  const booking = await Booking.findById(id).populate("user room");
  if(!booking) {
    throw new Error("Booking not found.");
  }

  if(booking.status !== "Pending") {
    throw new Error("Only pending bookings can be rejected.");
  }


  booking.status = "Rejected";
  booking.approval = {
    approver: approverId,
    decision: "Rejected",
    decisionDate: new Date()
  };


  // Push to history
  booking.statusHistory.push({
    status: "Rejected",
    changedBy: approverId
  });

  await booking.save();
  io.emit("bookingStatusUpdated", booking);
  return booking;
}  
