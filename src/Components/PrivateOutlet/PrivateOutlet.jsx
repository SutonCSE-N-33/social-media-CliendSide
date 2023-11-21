import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateOutlet = () => {
  const token = localStorage.getItem("token");
  let location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/register" state={{ from: location }} replace />
  );
};