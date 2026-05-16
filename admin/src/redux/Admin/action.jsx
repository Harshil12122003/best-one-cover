export const adminActions = {
  ADMIN_DETAIL_REQUEST: "ADMIN_DETAIL_REQUEST",
  ADMIN_DETAIL_SUCCESS: "ADMIN_DETAIL_SUCCESS",

  EDIT_ADMIN_PROFILE_REQUEST: "EDIT_ADMIN_PROFILE_REQUEST",
  EDIT_ADMIN_PROFILE_SUCCESS: "EDIT_ADMIN_PROFILE_SUCCESS",

  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",

  // MANAGER_ADDRESS_MANAGE_REQUEST: "MANAGER_ADDRESS_MANAGE_REQUEST",
  // MANAGER_ADDRESS_MANAGE_SUCCESS: "MANAGER_ADDRESS_MANAGE_SUCCESS",
  // MANAGER_ADDRESS_MANAGE_ERROR: "MANAGER_ADDRESS_MANAGE_ERROR",

  adminDetail: () => {
    return {
      type: adminActions.ADMIN_DETAIL_REQUEST,
    };
  },

  adminEditProfile: (EditData) => {
    return {
      type: adminActions.EDIT_ADMIN_PROFILE_REQUEST,
      data: EditData,
    };
  },

  // managerAddressManage: (AddressData) => {
  //   console.log('AddressData#####', AddressData)
  //   return {
  //     type : managerActions.MANAGER_ADDRESS_MANAGE_REQUEST,
  //     AddData : AddressData
  //   }
  // },

  adminChangePassword: (newPwd) => {
    return {
      type: adminActions.CHANGE_PASSWORD_REQUEST,
      forgotPwd: newPwd,
    };
  },
};
