import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { getAdminDashboard } from "../../api/adminApi";

function Card({ title, value }) {
  return (
    <div className="flex-1 min-w-[120px] bg-white shadow rounded p-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAdminDashboard();
      setData(res);
    } catch (err) {
      setError(err.message || "Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const handler = () => {
      load();
    };
    socket.on("dashboard:update", handler);
    return () => socket.off("dashboard:update", handler);
  }, []);

  if (loading && !data) return <div>Đang tải...</div>;
  if (error && !data) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      {data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card title="Tổng booking" value={data.total} />
            <Card title="Pending" value={data.pending} />
            <Card title="Approved" value={data.approved} />
            <Card title="Rejected" value={data.rejected} />
            <Card title="Cancelled" value={data.cancelled} />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Booking chờ duyệt</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[360px] w-full bg-white shadow rounded">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">Phòng</th>
                    <th className="p-3 text-left">Người đặt</th>
                    <th className="p-3 text-left">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {data.latestPending?.map((b) => (
                    <tr key={b._id} className="border-b">
                      <td className="p-3">{b.room?.name || "N/A"}</td>
                      <td className="p-3">{b.user?.name || b.user?.email || "N/A"}</td>
                      <td className="p-3">
                        {b.date} | {b.startTime} - {b.endTime}
                      </td>
                    </tr>
                  ))}
                  {(!data.latestPending || data.latestPending.length === 0) && (
                    <tr>
                      <td className="p-3 text-center text-gray-500" colSpan={3}>
                        Không có booking chờ duyệt
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
