import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/aifdigitalLogo.svg";
import {
  MdDashboard,
  MdPostAdd,
  MdAddCircleOutline,
  MdCalendarToday,
  MdPeople,
  MdManageAccounts,
  MdLogout,
  MdMenu,
  MdClose
} from "react-icons/md";
import { useState } from "react";

const menuItems = [
  { label: "Tablo", icon: <MdDashboard />, to: "/admin/dashboard" },
  { label: "Gönderiler", icon: <MdPostAdd />, to: "/admin/posts" },
  { label: "Gönderi Oluştur", icon: <MdAddCircleOutline />, to: "/admin/create-post" },
  { label: "Takvim", icon: <MdCalendarToday />, to: "/admin/calendar" },
  { label: "Müşteriler", icon: <MdPeople />, to: "/admin/customers" },
  { label: "Kullanıcılar", icon: <MdManageAccounts />, to: "/admin/users" },
];

const AdminSidebar = () => {
  const { setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setRole(null);
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobil Menü Butonu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-700 focus:outline-none"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Üst - Logo */}
        <div className="pt-16 md:pt-6 px-6 mb-4">
          <img src={logo} alt="AIF Digital Solutions" className="h-10 mb-4" />
          <div className="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-wide text-gray-800">
            Admin Paneli
          </div>
        </div>

        {/* Menü - Nav */}
        <nav className="flex-1 px-6 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Alt - Çıkış Butonu */}
        <div className="p-6 border-t border-gray-200 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-sm text-red-600 hover:text-red-700 transition"
          >
            <MdLogout className="text-xl" />
            Çıkış
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
