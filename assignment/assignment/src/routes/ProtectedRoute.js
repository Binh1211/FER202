import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ToastContext } from "../context/ToastContext";

const ProtectedRoute = ({ children, rolesAllowed }) => {
  const { user, loading } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);
  const location = useLocation();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng này!", "warning");
      setShouldRedirect(true);
    }
  }, [loading, user, showToast]);

  if (loading) return null;

  if (shouldRedirect) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (rolesAllowed && user && !rolesAllowed.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
