import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin sayfaları
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import CreatePost from "./pages/admin/createPost/CreatePost";
import Calendar from "./pages/admin/Calendar";
import Customers from "./pages/admin/Customers";

// Customer sayfaları
import CustomerLayout from "./pages/customer/CustomerLayout";
import Customer from "./pages/customer/Customer"; // Dashboard olarak kullanılıyor
import CustomerPosts from "./pages/customer/CustomerPosts";
import CustomerPost from "./pages/customer/CustomerPost"; // 💡 Eksik import eklendi
import CustomerCalendar from "./pages/customer/CustomerCalendar";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Admin paneli */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="customers" element={<Customers />} />
          </Route>

          {/* Customer paneli */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Customer />} />
            <Route path="posts" element={<CustomerPosts />} />
            <Route path="post" element={<CustomerPost />} />
            <Route path="calendar" element={<CustomerCalendar />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
