export const authActions = {

  ADMIN_LOGIN_REQUEST: "ADMIN_LOGIN_REQUEST",
  ADMIN_LOGIN_SUCCESS: "ADMIN_LOGIN_SUCCESS",

  ADMIN_LOGOUT_REQUEST: "ADMIN_LOGOUT_REQUEST",
  ADMIN_LOGOUT_SUCCESS: "ADMIN_LOGOUT_SUCCESS",


  adminLogin: (loginData) => {
    // console.log("dataLogin@@@", loginData);
    return {
      type: authActions.ADMIN_LOGIN_REQUEST,
      data: loginData,
    };
  },

  adminLogout: () => {
    return {
      type: authActions.ADMIN_LOGOUT_REQUEST,
    };
  },
};
