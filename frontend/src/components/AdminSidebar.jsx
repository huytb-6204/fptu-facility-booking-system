import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="font-bold text-lg mb-6">ADMIN</h2>

      <nav className="space-y-3">
        <Link to="/admin/dashboard" className="block hover:underline">
          Dashboard
        </Link>
        <Link to="/admin/bookings" className="block hover:underline">
          Approve Bookings
        </Link>
        <Link to="/admin/reports" className="block hover:underline">
          Reports
        </Link>
      </nav>
    </div>
  );
}
