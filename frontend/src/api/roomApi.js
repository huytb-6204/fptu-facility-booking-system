const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCampuses = async () => {
  const res = await fetch(`${API_BASE}/campus`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load campuses");
  return res.json();
};

export const getBuildings = async (campusId) => {
  const res = await fetch(`${API_BASE}/building`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load buildings");
  const data = await res.json();
  return campusId ? data.filter((b) => String(b.campus?._id || b.campus) === String(campusId)) : data;
};

export const getRooms = async (buildingId) => {
  const res = await fetch(`${API_BASE}/room`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load rooms");
  const data = await res.json();
  return buildingId ? data.filter((r) => String(r.building?._id || r.building) === String(buildingId)) : data;
};
