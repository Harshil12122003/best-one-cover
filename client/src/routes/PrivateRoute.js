import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoute = () => {
  const token = localStorage.getItem("TOKEN");
  // const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};
