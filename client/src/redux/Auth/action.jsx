export const authActions = {
  REGISTRATION_REQUEST: "REGISTRATION_REQUEST",
  REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS",
  REGISTRATION_ERROR: "REGISTRATION_ERROR",

  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",


  USER_LOGOUT: "USER_LOGOUT",

  CATCH_ERROR: "CATCH_ERROR",

  Registration: (RegisterData, navigate) => {
    return {
      type: authActions.REGISTRATION_REQUEST,
      data : RegisterData,
      // token : token,
      navigate
    };
  },

  Login:(loginData, navigate) => {
    return {
      type: authActions.LOGIN_REQUEST,
      data : loginData,
      navigate
    };
  },

  userLogout: () => {
    return {
      type: authActions.USER_LOGOUT,
    };
  },

};
