import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="py-10 text-slate-300">Checking authentication...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
