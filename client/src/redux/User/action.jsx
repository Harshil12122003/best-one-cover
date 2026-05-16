export const userActions = {
  USER_DETAIL_REQUEST: "USER_DETAIL_REQUEST",
  USER_DETAIL_SUCCESS: "USER_DETAIL_SUCCESS",

  EDIT_USER_PROFILE_REQUEST: "EDIT_USER_PROFILE_REQUEST",
  EDIT_USER_PROFILE_SUCCESS: "EDIT_USER_PROFILE_SUCCESS",

  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",

  USER_ADDRESS_MANAGE_REQUEST: "USER_ADDRESS_MANAGE_REQUEST",
  USER_ADDRESS_MANAGE_SUCCESS: "USER_ADDRESS_MANAGE_SUCCESS",

  CONTACTUS_REQUEST: "CONTACTUS_REQUEST",
  CONTACTUS_SUCCESS: "CONTACTUS_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",



  userDetail: () => {
    return {
      type: userActions.USER_DETAIL_REQUEST,
    };
  },

  EditProfile: (EditData) => {
    return {
      type: userActions.EDIT_USER_PROFILE_REQUEST,
      data: EditData,
    };
  },

  //AddressManage: (AddressData) => {
  //   return {
  //     type: userActions.USER_ADDRESS_MANAGE_REQUEST,
  //     AddData: AddressData
  //   }
  // },

  ChangePassword: (newPwd) => {
    return {
      type: userActions.CHANGE_PASSWORD_REQUEST,
      forgotPwd: newPwd,
    };
  },

  contactUs: (contactData) => {
    return {
      type: userActions.CONTACTUS_REQUEST,
      data: contactData,
    }
  }
};
