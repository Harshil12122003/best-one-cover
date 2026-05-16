// import Cookies from "js-cookie";

const isLoggedIn = () => {
  // const token = Cookies.get("token");
  const token = localStorage.getItem("ADMIN_TOKEN");
  console.log("token", token);
  return !!token;
};

export default isLoggedIn;
