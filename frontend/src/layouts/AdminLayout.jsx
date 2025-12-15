import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <Outlet />
      </div>
    </div>
  );
}
