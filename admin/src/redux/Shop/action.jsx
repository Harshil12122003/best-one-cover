export const shopActions = {
  ADD_SHOP_REQUEST: "ADD_SHOP_REQUEST",
  ADD_SHOP_SUCCESS: "ADD_SHOP_SUCCESS",

  GET_SHOP_REQUEST: "GET_SHOP_REQUEST",
  GET_SHOP_SUCCESS: "GET_SHOP_SUCCESS",

  EDIT_SHOP_REQUEST: "EDIT_SHOP_REQUEST",
  EDIT_SHOP_SUCCESS: "EDIT_SHOP_SUCCESS",

  DELETE_SHOP_REQUEST: "DELETE_SHOP_REQUEST",
  DELETE_SHOP_SUCCESS: "DELETE_SHOP_SUCCESS",

  GET_SINGLE_SHOP_REQUEST: "GET_SINGLE_SHOP_REQUEST",
  GET_SINGLE_SHOP_SUCCESS: "GET_SINGLE_SHOP_SUCCESS",

  GET_SHOPS_COUNTER_REQUEST: "GET_SHOPS_COUNTER_REQUEST",
  GET_SHOPS_COUNTER_SUCCESS: "GET_SHOPS_COUNTER_SUCCESS",

  GET_SHOPS_EXPENSE_REQUEST: "GET_SHOPS_EXPENSE_REQUEST",
  GET_SHOPS_EXPENSE_SUCCESS: "GET_SHOPS_EXPENSE_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  addShop: (addShopData, navigate) => {
    return {
      type: shopActions.ADD_SHOP_REQUEST,
      addShopData,
      navigate
    }
  },

  getShops: () => {
    return {
      type: shopActions.GET_SHOP_REQUEST,
    };
  },

  editShop: (editData,id) => {
    // console.log("editData",editData)
    // console.log("id@@@",id)

    return {
      type: shopActions.EDIT_SHOP_REQUEST,
      editData,
      id
    };
  },

  getSingleShop: (singleData) => {
    // console.log("GET_SINGLE_SHOP_REQUEST",singleData)
    return {
      type: shopActions.GET_SINGLE_SHOP_REQUEST,
      singleData
    };
  },

  deleteShop: (data) => {
    return {
      type: shopActions.DELETE_SHOP_REQUEST,
      data
    };
  },

  getShopCounters: (data) => {
    return {
      type: shopActions.GET_SHOPS_COUNTER_REQUEST,
      data
    };
  },

  getShopExpense: (data) => {
    return {
      type: shopActions.GET_SHOPS_EXPENSE_REQUEST,
      data
    };
  },
};
