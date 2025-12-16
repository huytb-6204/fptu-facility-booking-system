import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import RequireAdmin from "./RequireAdmin";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/student/Dashboard";
import Booking from "../pages/student/Booking";
import MyBookings from "../pages/student/MyBookings";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminReports from "../pages/admin/AdminReports";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || !(role === "Student" || role === "Lecturer")) {
    return <Navigate to="/login" replace />;
  }
  return children || <Outlet />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <RequireAuth>
              <UserLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
