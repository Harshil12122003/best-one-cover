import setToken from "utils/setToken";
import { userActions } from "./action";

const block = {
  loading: false,
  success: false,
};

const initialState = {
  user: { ...block, userProfile: null },
  edit: { ...block, editProfile: null },
  changePassword: { ...block, password: null },
  addressManage: { ...block, address: null },
  contactUs: { ...block, contact: [] },
  error: false,

};

const userReducer = (state = initialState, action) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case userActions.USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          userProfile: action.payload,
          success: true,
          loading: false,
        },
      };

    case userActions.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        edit: {
          ...state.edit,
          editProfile: action.payload,
          success: true,
          loading: false,
        },
        user: {
          ...state.user,
          userProfile: action.payload,
          success: true,
          loading: false,
        },
      };

    // case userActions.EDIT_USER_PROFILE_SUCCESS:
    //   return {
    //     ...state,
    //     addressManage: {
    //       ...state.addressManage,
    //       address: action.payload,
    //       success: true,
    //       loading: false,
    //     },
    //   };

    case userActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          password: action.payload,
          success: true,
          loading: false,
        },
      };

    case userActions.CONTACTUS_SUCCESS:
      return {
        ...state,
        contactUs: {
          ...state.contactUs,
          contact: action.payload,
          success: true,
          loading: false
        }
      }

    case userActions.CATCH_ERROR:
      return {
        ...state,
        error: true
      }

    default:
      return state;
  }
};

export default userReducer;
