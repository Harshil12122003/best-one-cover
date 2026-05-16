import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import RoutesList from "./router";
import AuthLayout from "./layout/AuthLayout";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/Order/action";
import { adminActions } from "redux/Admin/action";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useReducerData("auth", "user", "");
  const user = localStorage.getItem("ADMIN_TOKEN") ? true : false;
  const renderRoutes = () => {
    const isLogin = user;
    const renderRoute = (Component, layout, isPrivate) => {
      if (Component) {
        switch (layout) {
          case "private":
            return isLogin && isPrivate ? (
              <PrivateLayout>
                <Component />
              </PrivateLayout>
            ) : (
              <Navigate to="/signin" />
            );
          case "auth":
            return !isLogin ? (
              <Navigate to="/signin" />
            ) : (
              <AuthLayout>
                <Component />
              </AuthLayout>
            );
          case "public":
          default:
            return (
              <PublicLayout>
                <Component />
              </PublicLayout>
            );
        }
      }
      return null;
    };

    return RoutesList.map((route) => (
      <Route
        key={route.name}
        path={route.path}
        element={renderRoute(route.component, route.layout, route.isPrivate)}
      />
    ));
  };

  useEffect(() => {
    if (user) {
      dispatch(adminActions.adminDetail());
      dispatch(actions.getNotifications());
    }
  }, [user])

  return (
    <div className="App">
      <ToastContainer />
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
};

export default App;
