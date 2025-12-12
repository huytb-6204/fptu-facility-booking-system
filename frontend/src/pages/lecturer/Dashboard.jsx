import { useEffect, useState } from "react";
import { getBookingsByUser } from "../../api/bookingApi";

export default function LecturerDashboard() {
  const [stats, setStats] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getBookingsByUser(userId).then((data) => {
      setStats({
        total: data.length,
        approved: data.filter((b) => b.status === "Approved").length,
        pending: data.filter((b) => b.status === "Pending").length,
        rejected: data.filter((b) => b.status === "Rejected").length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Stat label="Tổng lượt đặt" value={stats.total} />
        <Stat label="Đã duyệt" value={stats.approved} />
        <Stat label="Đang chờ" value={stats.pending} />
        <Stat label="Bị từ chối" value={stats.rejected} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h3 className="text-gray-500">{label}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
