import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold">FPTU Booking</h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/booking" className="block text-gray-700 hover:text-blue-600">
          Đặt phòng
        </Link>

        <Link to="/my-bookings" className="block text-gray-700 hover:text-blue-600">
          Lịch sử đặt
        </Link>
      </nav>
    </div>
  );
}
