import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; 

const ProtectedRoute = ({ allowedRole, children }) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
