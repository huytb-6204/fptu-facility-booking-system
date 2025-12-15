const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllBookings = async () => {
  const res = await fetch(`${API_BASE}/booking`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return res.json();
};

export const getBookings = getAllBookings;

export const getBookingsByUser = async (userId) => {
  const all = await getAllBookings();
  return all.filter((b) => String(b.user?._id || b.user) === String(userId));
};

export const createBooking = async (payload) => {
  const res = await fetch(`${API_BASE}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create booking");
  }
  return res.json();
};

export const cancelBooking = async (id) => {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`${API_BASE}/booking/cancel/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(), 
    },
    body: JSON.stringify({ user: userId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to cancel booking");
  }
  return res.json();
};

export const approveBooking = async (id) => {
  const res = await fetch(`${API_BASE}/booking/approve/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ approver: localStorage.getItem("userId") }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to approve booking");
  }
  return res.json();
};

export const rejectBooking = async (id) => {
  const res = await fetch(`${API_BASE}/booking/reject/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ approver: localStorage.getItem("userId") }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to reject booking");
  }
  return res.json();
};
