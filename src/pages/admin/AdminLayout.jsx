// src/pages/admin/AdminLayout.jsx
import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar />

      {/* Ana içerik alanı */}
      <main className="min-h-screen p-6 bg-gray-50 transition-all duration-300 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
