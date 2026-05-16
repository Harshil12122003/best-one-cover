import setToken from "utils/setToken";
import { adminActions } from "./action";


const block = {
  error: null,
  loading: false,
  success: false,
};

const initialState = {
  admin: { ...block, adminProfile: null },
  edit: { ...block, editProfile: null },
  changePassword: { ...block, password: null },
  // addressManage: { ...block, address: null },
};

const adminReducer = (state = initialState, action) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case adminActions.ADMIN_DETAIL_REQUEST:
      return {
        ...state,
        admin: {
          ...state.admin,
          success: false,
          loading: true,
        },
      };

    case adminActions.ADMIN_DETAIL_SUCCESS:
      return {
        ...state,
        admin: {
          ...state.admin,
          adminProfile: action.payload,
          success: true,
          loading: false,
        },
      };

    case adminActions.EDIT_ADMIN_PROFILE_REQUEST:
      return {
        ...state,
        edit: {
          ...state.edit,
          success: false,
          loading: true,
        },
      };

    case adminActions.EDIT_ADMIN_PROFILE_SUCCESS:
      // console.log('action.editProfile', action.payload)
      return {
        ...state,
        edit: {
          ...state.edit,
          editProfile: action.payload,
          success: true,
          loading: false,
        },
        admin: {
          ...state.admin,
          adminProfile: action.payload,
          success: true,
          loading: false,
        },
      };

    case adminActions.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          success: false,
          loading: true,
        },
      };

    case adminActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          password: action.payload,
          success: true,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default adminReducer;
