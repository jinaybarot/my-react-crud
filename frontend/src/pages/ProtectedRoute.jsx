// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

// ✅ Checks token before allowing route
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}
