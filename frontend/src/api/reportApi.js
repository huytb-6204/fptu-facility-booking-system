const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getReportSummary = async () => {
  const res = await fetch(`${API_BASE}/reports/summary`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch report summary");
  }
  return res.json();
};
