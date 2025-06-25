// src/pages/Customer/CustomerLayout.jsx
import CustomerSidebar from "../../components/CustomerSidebar";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div>
      <CustomerSidebar />

      {/* Ana içerik alanı */}
      <main className="min-h-screen p-6 bg-gray-50 transition-all duration-300 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
