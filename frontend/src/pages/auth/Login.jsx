import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      const userId = res.user.id || res.user._id; 

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", res.user.name);

      const role = res.user.role;
      const redirectByRole = {
        Admin: "/admin/bookings",
        Student: "/dashboard",
        Lecturer: "/dashboard",
      };

      navigate(redirectByRole[role] || "/login", { replace: true });
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-xl rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
