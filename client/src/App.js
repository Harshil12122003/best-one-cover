import "./App.css";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import RoutesList from "./router";
import AuthLayout from "./layout/AuthLayout";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/User/action";
// import { userActions } from "redux/User/action";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authentic = useSelector((state) => state.auth.auth);
  // const token = localStorage.getItem("TOKEN");
  const isLoggedOutSuccess = useSelector((state) => state.auth.logout.success);
  // const authentic = useSelector((state) => state.user.user.userProfile);

  const isLogin = true;
  // const userNotFount = authentic?.email || authentic?.fname || authentic?.lname || authentic?.mobile

  // console.log("userProfile", userNotFount);
  // console.log("authData", authentic);
  // console.log("token", token);

  // useEffect(() => {
  //   if(!userNotFount){
  //     navigate('/signin')
  //   }
  // }, [userNotFount]);

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      dispatch(userActions.userDetail());
    }
  }, [dispatch, localStorage.getItem("TOKEN")]);

  const renderRoutes = () => {
    // const isLogin = authData;

    const renderRoute = (Component, layout, isPrivate) => {
      if (Component) {
        switch (layout) {
          case "private":
            return isLogin && isPrivate ? (
              <PrivateLayout>
                <Component />
              </PrivateLayout>
            ) : (
              <Navigate to="/" />
            );
          case "auth":
            return !isLogin ? (
              <Navigate to="/" />
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
    if (isLoggedOutSuccess) {
      navigate("/signin");
    }
  }, [isLoggedOutSuccess]);

  // useEffect(() => {
  //   dispatch(userActions.userDetail());
  // }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>{renderRoutes()}</Routes>
    </div>
  );
};

export default App;
