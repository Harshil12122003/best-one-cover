// import Cookies from "js-cookie";

const isLoggedIn = () => {
  // const token = Cookies.get("token");
  const token = localStorage.getItem("TOKEN");
  return !!token;
};

export default isLoggedIn;
