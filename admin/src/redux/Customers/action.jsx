export const actions = {

  GET_CUSTOMERS_REQUEST: "GET_CUSTOMERS_REQUEST",
  GET_CUSTOMERS_SUCCESS: "GET_CUSTOMERS_SUCCESS",

  DELETE_CUSTOMER_REQUEST: "DELETE_CUSTOMER_REQUEST",
  DELETE_CUSTOMER_SUCCESS: "DELETE_CUSTOMER_SUCCESS",

  GET_MANAGERS_REQUEST: "GET_MANAGERS_REQUEST",
  GET_MANAGERS_SUCCESS: "GET_MANAGERS_SUCCESS",

  DELETE_MANAGER_REQUEST: "DELETE_MANAGER_REQUEST",
  DELETE_MANAGER_SUCCESS: "DELETE_MANAGER_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getCustomers: (userName) => {
    return {
      type: actions.GET_CUSTOMERS_REQUEST,
      userName
    };
  },

  deleteCustomer: (data) => {
    return {
      type: actions.DELETE_CUSTOMER_REQUEST,
      data,
    };
  },

  getManagers: (userName) => {
    return {
      type: actions.GET_MANAGERS_REQUEST,
      userName
    };
  },

  deleteManger: (data) => {
    return {
      type: actions.DELETE_MANAGER_REQUEST,
      data,
    };
  },
};
