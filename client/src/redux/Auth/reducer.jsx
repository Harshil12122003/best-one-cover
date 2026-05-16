import { authActions } from "./action";
import setToken from "utils/setToken";

const block = {
  error: null,
  loading: false,
  success: false,
};
const initialState = {
  auth: { ...block, user: null, token: null },
  logout: { ...block },
};

const AuthReducer = (state = initialState, action) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case authActions.REGISTRATION_REQUEST:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
        },
      };
    case authActions.REGISTRATION_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: null,
          user: action.payload,
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
    case authActions.REGISTRATION_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: action.error,
          loading: false,
        },
      };

    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
        },
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: null,
          user: action.payload,
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
    case authActions.LOGIN_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: action.error,
          loading: false,
        },
      };

    
    case authActions.USER_LOGOUT:
      localStorage.removeItem("TOKEN");

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
          user: null,
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
