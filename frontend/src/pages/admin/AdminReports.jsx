import { useEffect, useState } from "react";
import { getReportSummary } from "../../api/reportApi";

export default function AdminReports() {
  const [summary, setSummary] = useState(null);
  const [roomReport, setRoomReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getReportSummary();
      setSummary({
        total: data.total || 0,
        approved: data.approved || 0,
        rejected: data.rejected || 0,
        cancelled: data.cancelled || 0,
      });
      setRoomReport(data.byRoom || []);
    } catch (err) {
      setError(err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Báo cáo sử dụng</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tổng quan</h2>
        {loading && <div>Đang tải...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {summary && !loading && !error && (
          <ul className="list-disc pl-5 space-y-1">
            <li>Tổng booking: {summary.total}</li>
            <li>Approved: {summary.approved}</li>
            <li>Rejected: {summary.rejected}</li>
            <li>Cancelled: {summary.cancelled}</li>
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Theo phòng</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[320px] w-full bg-white shadow rounded">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Phòng</th>
                <th className="p-3 text-left">Số lượt</th>
              </tr>
            </thead>
            <tbody>
              {roomReport.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="p-3">{r.room?.name || "N/A"}</td>
                  <td className="p-3">{r.total}</td>
                </tr>
              ))}
              {roomReport.length === 0 && (
                <tr>
                  <td className="p-3 text-center text-gray-500" colSpan={2}>
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Theo thời gian</h2>
        <p className="text-gray-600 text-sm">Chart optional (chưa triển khai)</p>
      </section>
    </div>
  );
}
