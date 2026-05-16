import { Navigate, Outlet } from "react-router-dom";
export const AuthRoute = () => {
  // const token = Cookies.get("token");
  const token = localStorage.getItem("TOKEN");
  return token ? <Navigate to="/" replace /> : <Outlet />;
};
