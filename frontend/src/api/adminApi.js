const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAdminDashboard = async () => {
  const res = await fetch(`${API_BASE}/admin/dashboard`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to load admin dashboard");
  }
  return res.json();
};
