import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
// CreatePost dosyasının yolu doğru ve küçük harfle yazılmış
import CreatePost from "./pages/admin/createPost/CreatePost";
import Calendar from "./pages/admin/Calendar";
import Customers from "./pages/admin/Customers";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login sayfası */}
          <Route path="/" element={<Login />} />

          {/* Admin paneli korumalı route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Admin iç sayfalar */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="customers" element={<Customers />} />
            
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
