import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBookingsByUser, cancelBooking } from "../../api/bookingApi";
import { socket } from "../../socket";
import BookingHistoryModal from "../../components/BookingHistoryModal";

export default function LecturerMyBookings() {
  const [list, setList] = useState([]);
  const userId = localStorage.getItem("userId");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    getBookingsByUser(userId).then(setList).catch(console.error);
  }, [userId]);

  useEffect(() => {
    const handleStatusUpdated = (updatedBooking) => {
      setList((prev) => {
        const exists = prev.some((b) => b._id === updatedBooking._id);
        if (!exists) return prev;

        const prevBooking = prev.find((b) => b._id === updatedBooking._id);
        if (prevBooking?.status !== updatedBooking.status && updatedBooking.status === "Rejected") {
          toast.error("Booking của bạn đã bị từ chối");
        }

        return prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b));
      });
    };

    socket.on("bookingStatusUpdated", handleStatusUpdated);
    return () => {
      socket.off("bookingStatusUpdated", handleStatusUpdated);
    };
  }, []);

  const handleCancel = async (id) => {
    await cancelBooking(id);
    setList((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt phòng</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Phòng</th>
            <th className="p-3 text-left">Ngày</th>
            <th className="p-3 text-left">Giờ</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {list.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="p-3">{b.room?.name}</td>
              <td className="p-3">{b.date}</td>
              <td className="p-3">
                {b.startTime} - {b.endTime}
              </td>
              <td className="p-3">
                <span className={getStatusClass(b.status)}>{getStatusLabel(b.status)}</span>
              </td>
              <td className="p-3">
                {b.status === "Pending" && (
                  <button onClick={() => handleCancel(b._id)} className="text-red-600">
                    Hủy
                  </button>
                )}
                <button
                  onClick={() => setSelectedBooking(b)}
                  className="ml-3 text-blue-600"
                >
                  Xem lịch sử
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookingHistoryModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}

const statusColors = {
  Pending: "text-yellow-500",
  Approved: "text-green-600",
  Rejected: "text-red-600",
  Cancelled: "text-gray-600",
};

const statusLabel = {
  Pending: "🟡 Pending",
  Approved: "🟢 Approved",
  Rejected: "🔴 Rejected",
  Cancelled: "⚫ Cancelled",
};

const getStatusClass = (status) => statusColors[status] || "text-gray-700";
const getStatusLabel = (status) => statusLabel[status] || status;
