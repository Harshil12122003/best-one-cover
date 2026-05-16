export const actions = {
  GET_STOCK_REQUEST: "GET_STOCK_REQUEST",
  GET_STOCK_SUCCESS: "GET_STOCK_SUCCESS",

  GET_SINGLE_STOCK_REQUEST: "GET_SINGLE_STOCK_REQUEST",
  GET_SINGLE_STOCK_SUCCESS: "GET_SINGLE_STOCK_SUCCESS",

  CREATE_STOCK_REQUEST: "CREATE_STOCK_REQUEST",
  CREATE_STOCK_SUCCESS: "CREATE_STOCK_SUCCESS",

  UPDATE_STOCK_REQUEST: "UPDATE_STOCK_REQUEST",
  UPDATE_STOCK_SUCCESS: "UPDATE_STOCK_SUCCESS",

  DELETE_STOCK_REQUEST: "DELETE_STOCK_REQUEST",
  DELETE_STOCK_SUCCESS: "DELETE_STOCK_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

 getStock: (keyword) => {
    return {
      type: actions.GET_STOCK_REQUEST,
      keyword,
    };
  },

  getSingleStock: (data) => {
    return {
      type: actions.GET_SINGLE_STOCK_REQUEST,
      data
    };
  },


  createStock: (data, navigate) => {
    return {
      type: actions.CREATE_STOCK_REQUEST,
      data,
      navigate
    };
  },

  updateStock: (data, navigate) => {
    
    return {
      type: actions.UPDATE_STOCK_REQUEST,
      data,
      navigate
    };
  },

  deleteStock: (data) => {
    return {
      type: actions.DELETE_STOCK_REQUEST,
      data
    };
  },
};
