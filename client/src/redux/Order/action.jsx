export const actions = {
  CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST",
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",

  GET_ORDER_DETAILS_REQUEST: "GET_ORDER_DETAILS_REQUEST",
  GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS",

  GET_ORDERS_REQUEST: "GET_ORDERS_REQUEST",
  GET_ORDERS_SUCCESS: "GET_ORDERS_SUCCESS",

  UPDATE_ORDER_REQUEST: "UPDATE_ORDER_REQUEST",
  UPDATE_ORDER_SUCCESS: "UPDATE_ORDER_SUCCESS",

  DELETE_ORDER_REQUEST: "DELETE_ORDER_REQUEST",
  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS",

  CREATE_PAYMENT_REQUEST: "CREATE_PAYMENT_REQUEST",
  CREATE_PAYMENT_SUCCESS: "CREATE_PAYMENT_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getOrders: () => {
    return {
      type: actions.GET_ORDERS_REQUEST,
    };
  },

  createOrder: (data, navigate) => {
    return {
      type: actions.CREATE_ORDER_REQUEST,
      data,
      navigate
    };
  },

  updateOrder: (data) => {
    return {
      type: actions.UPDATE_ORDER_REQUEST,
      data,
    };
  },

  deleteOrder: (data) => {
    return {
      type: actions.DELETE_ORDER_REQUEST,
      data,
    };
  },

  getOrderDetails: (data) => {
    return {
      type: actions.GET_ORDER_DETAILS_REQUEST,
      data,
    };
  },

  createPayment: (data) => {
    return {
      type: actions.CREATE_PAYMENT_REQUEST,
      data,
    };
  },
};
