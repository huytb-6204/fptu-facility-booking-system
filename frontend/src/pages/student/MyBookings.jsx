import { useEffect, useState } from "react";
import { getBookingsByUser, cancelBooking } from "../../api/bookingApi";

export default function StudentMyBookings() {
  const [list, setList] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getBookingsByUser(userId).then(setList).catch(console.error);
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
              <td className="p-3">{b.status}</td>
              <td className="p-3">
                {b.status === "Pending" && (
                  <button onClick={() => handleCancel(b._id)} className="text-red-600">
                    Hủy
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
