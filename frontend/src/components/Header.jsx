export default function Header() {
  const userName = localStorage.getItem("userName") || "User";
  
  return (
    <header className="h-16 bg-white shadow flex items-center justify-end px-6">
      <span className="mr-4 font-medium">{userName}</span>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-red-500"
      >
        Đăng xuất
      </button>
    </header>
  );
}
