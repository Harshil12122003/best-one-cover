export const actions = {
  GET_CART_ITEM_REQUEST: "GET_CART_ITEM_REQUEST",
  GET_CART_ITEM_SUCCESS: "GET_CART_ITEM_SUCCESS",

  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",

  REMOVE_CART_ITEM_REQUEST: "REMOVE_CART_ITEM_REQUEST",
  REMOVE_CART_ITEM_SUCCESS: "REMOVE_CART_ITEM_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  addItemsToCart: (data) => {
    return {
      type: actions.ADD_TO_CART_REQUEST,
      data
    };
  },
  removeItemsFromCart: (data) => {
    return {
      type: actions.REMOVE_CART_ITEM_REQUEST,
      data,
    };
  },
};
