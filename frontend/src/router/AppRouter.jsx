import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/student/Dashboard";
import Booking from "../pages/student/Booking";
import MyBookings from "../pages/student/MyBookings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
