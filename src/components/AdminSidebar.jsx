import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const AdminSidebar = () => {
  const { setRole } = useAuth();

  const handleLogout = () => {
    setRole(null);
    window.location.href = "/"; // ana sayfaya yönlendir
  };

  const linkClass =
    "block px-4 py-2 hover:bg-indigo-100 rounded text-gray-700";

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm p-4 space-y-2">
      <h2 className="text-lg font-semibold text-indigo-700 mb-4">Admin Panel</h2>
      <NavLink to="/admin/dashboard" className={linkClass}>Pano</NavLink>
      <NavLink to="/admin/posts" className={linkClass}>Gönderiler</NavLink>
      <NavLink to="/admin/create-post" className={linkClass}>Gönderi Oluştur</NavLink>
      <NavLink to="/admin/calendar" className={linkClass}>Takvim</NavLink>
      <NavLink to="/admin/customers" className={linkClass}>Müşteriler</NavLink>
      <NavLink to="/admin/users" className={linkClass}>Kullanıcılar</NavLink>

      <button
        onClick={handleLogout}
        className="mt-10 w-full text-left px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded"
      >
        Çıkış
      </button>
    </div>
  );
};

export default AdminSidebar;