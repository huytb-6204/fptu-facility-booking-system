import { useEffect, useState } from "react";
import { getAllBookings, approveBooking, rejectBooking } from "../../api/bookingApi";
import { socket } from "../../socket";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadPending();
  }, []);

  useEffect(() => {
    const handleStatusUpdated = (booking) => {
      setBookings((prev) => {
        if (booking.status !== "Pending") {
          return prev.filter((b) => b._id !== booking._id);
        }
        const exists = prev.some((b) => b._id === booking._id);
        return exists
          ? prev.map((b) => (b._id === booking._id ? booking : b))
          : [...prev, booking];
      });
    };

    socket.on("bookingStatusUpdated", handleStatusUpdated);
    return () => {
      socket.off("bookingStatusUpdated", handleStatusUpdated);
    };
  }, []);

  const loadPending = async () => {
    const data = await getAllBookings();
    setBookings(data.filter((b) => b.status === "Pending"));
  };

  async function handleApprove(id) {
    await approveBooking(id);
    loadPending();
  }

  async function handleReject(id) {
    await rejectBooking(id);
    loadPending();
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Approve Bookings</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Room</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="p-3">{b.user?.name || b.user?.email}</td>
              <td className="p-3">{b.room?.name}</td>
              <td className="p-3">{b.date}</td>
              <td className="p-3">
                {b.startTime} - {b.endTime}
              </td>
              <td className="p-3">
                <button
                  className="text-green-600 mr-3"
                  onClick={() => handleApprove(b._id)}
                >
                  Approve
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleReject(b._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Không có booking chờ duyệt
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
