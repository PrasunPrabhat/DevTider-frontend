// RouteGuards.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protect private pages (feed, profile, etc.)
export const ProtectedRoute = ({ children }) => {
  const userData = useSelector((store) => store.user);
  if (!userData) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Restrict public pages (login, signup) if logged in
export const PublicRoute = ({ children }) => {
  const userData = useSelector((store) => store.user);

  if (userData) {
    return <Navigate to="/feed" replace />;
  }
  return children;
};
