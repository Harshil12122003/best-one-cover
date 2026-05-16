export const actions = {
  CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",

  GET_ORDER_DETAILS_REQUEST: "GET_ORDER_DETAILS_REQUEST",
  GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS",

  GET_SHOP_ORDER_DETAILS_REQUEST: "GET_SHOP_ORDER_DETAILS_REQUEST",
  GET_SHOP_ORDER_DETAILS_SUCCESS: "GET_SHOP_ORDER_DETAILS_SUCCESS",

  GET_ORDERS_REQUEST: "GET_ORDERS_REQUEST",
  GET_ORDERS_SUCCESS: "GET_ORDERS_SUCCESS",

  UPDATE_ORDER_STATUS_REQUEST: "UPDATE_ORDER_STATUS_REQUEST",
  UPDATE_ORDER_STATUS_SUCCESS: "UPDATE_ORDER_STATUS_SUCCESS",

  DELETE_ORDER_REQUEST: "DELETE_ORDER_REQUEST",
  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS",

  CREATE_PAYMENT_REQUEST: "CREATE_PAYMENT_REQUEST",
  CREATE_PAYMENT_SUCCESS: "CREATE_PAYMENT_SUCCESS",

  GET_SHOP_ORDERS_REQUEST: "GET_SHOP_ORDERS_REQUEST",
  GET_SHOP_ORDERS_SUCCESS: "GET_SHOP_ORDERS_SUCCESS",

  UPDATE_SHOP_ORDER_STATUS_REQUEST: "UPDATE_SHOP_ORDER_STATUS_REQUEST",
  UPDATE_SHOP_ORDER_STATUS_SUCCESS: "UPDATE_SHOP_ORDER_STATUS_SUCCESS",

  DELETE_SHOP_ORDER_REQUEST: "DELETE_SHOP_ORDER_REQUEST",
  DELETE_SHOP_ORDER_SUCCESS: "DELETE_SHOP_ORDER_SUCCESS",

  GET_NOTIFICATIONS_REQUEST: "GET_NOTIFICATIONS_REQUEST",
  GET_NOTIFICATIONS_SUCCESS: "GET_NOTIFICATIONS_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getOrders: (data) => {
    return {
      type: actions.GET_ORDERS_REQUEST,
      data
    };
  },

  createOrder: (data) => {
    return {
      type: actions.CREATE_ORDER_REQUEST,
      data,
    };
  },

  updateOrder: (data) => {
    return {
      type: actions.UPDATE_ORDER_STATUS_REQUEST,
      data,
    };
  },

  updateShopOrder: (data) => {
    return {
      type: actions.UPDATE_SHOP_ORDER_STATUS_REQUEST,
      data,
    };
  },

  deleteOrder: (data) => {
    return {
      type: actions.DELETE_ORDER_REQUEST,
      data,
    };
  },

  deleteShopOrder: (data) => {
    return {
      type: actions.DELETE_SHOP_ORDER_REQUEST,
      data,
    };
  },

  getOrderDetails: (data) => {
    return {
      type: actions.GET_ORDER_DETAILS_REQUEST,
      data,
    };
  },

  getShopOrderDetails: (data) => {
    return {
      type: actions.GET_SHOP_ORDER_DETAILS_REQUEST,
      data,
    };
  },

  createPayment: (data) => {
    return {
      type: actions.CREATE_PAYMENT_REQUEST,
      data,
    };
  },

  getShopOrders: (data) => {
    return {
      type: actions.GET_SHOP_ORDERS_REQUEST,
      data
    };
  },

  getNotifications: () => {
    return {
      type: actions.GET_NOTIFICATIONS_REQUEST,
    };
  },
};
