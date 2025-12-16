export default function BookingHistoryModal({ booking, onClose }) {
  if (!booking) return null;

  const timeline = (booking.statusHistory || []).slice().sort((a, b) => {
    const timeA = a.changedAt ? new Date(a.changedAt).getTime() : 0;
    const timeB = b.changedAt ? new Date(b.changedAt).getTime() : 0;
    return timeA - timeB;
  });

  const formatTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4">Chi tiết booking</h3>

        <div className="space-y-2 mb-4 text-sm">
          <div><span className="font-semibold">Người đặt:</span> {booking.user?.name || booking.user?.email || "N/A"}</div>
          <div><span className="font-semibold">Phòng:</span> {booking.room?.name || "N/A"}</div>
          <div><span className="font-semibold">Ngày:</span> {booking.date}</div>
          <div><span className="font-semibold">Giờ:</span> {booking.startTime} - {booking.endTime}</div>
          <div><span className="font-semibold">Trạng thái:</span> {booking.status}</div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Lịch sử</h4>
          <ul className="space-y-2 text-sm max-h-64 overflow-auto">
            {timeline.map((item, idx) => (
              <li key={idx} className="border rounded p-2">
                <div className="font-semibold">{item.status}</div>
                <div>{formatTime(item.changedAt)}</div>
                <div className="text-gray-600">
                  Bởi: {item.changedBy?.name || item.changedBy?.email || item.changedBy || "N/A"}
                </div>
              </li>
            ))}
            {timeline.length === 0 && <li className="text-gray-500">Chưa có lịch sử</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
