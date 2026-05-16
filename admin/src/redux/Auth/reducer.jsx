import { authActions } from "./action";
import setToken from "utils/setToken";

const block = {
  error: null,
  loading: false,
  success: false,
};
const initialState = {
  auth: { ...block, admin: null, token: null },
  logout: { ...block },
};

const AuthReducer = (state = initialState, action) => {
  // console.log("state@@@@", state);
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {

    case authActions.ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
        },
      };
    case authActions.ADMIN_LOGIN_SUCCESS:
      // console.log('action.payload@@@@@', action.payload)
      // console.log('action.payload@@@@@', action.token)

      return {
        ...state,
        auth: {
          ...state.auth,
          error: null,
          admin: action.payload,
          token: action.token,
          success: true,
          loading: false,
        },
        logout: {
          ...state.logout,
          success: false,
          loading: false,
        },
      };
    
    case authActions.ADMIN_LOGOUT_SUCCESS:
      localStorage.removeItem("ADMIN_TOKEN");
      return {
        ...state,
        logout: {
          ...state.logout,
          success: true,
          loading: false,
        },
        auth: {
          ...state.auth,
          error: null,
          admin: null,
          token: null,
          success: false,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
