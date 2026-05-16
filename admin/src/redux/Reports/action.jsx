export const actions = {
  GET_SALES_REQUEST: "GET_SALES_REQUEST",
  GET_SALES_SUCCESS: "GET_SALES_SUCCESS",

  GET_COUNTER_REQUEST: "GET_COUNTER_REQUEST",
  GET_COUNTER_SUCCESS: "GET_COUNTER_SUCCESS",

  GET_PROFIT_REQUEST: "GET_PROFIT_REQUEST",
  GET_PROFIT_SUCCESS: "GET_PROFIT_SUCCESS",

  GET_REVENUE_REQUEST: "GET_REVENUE_REQUEST",
  GET_REVENUE_SUCCESS: "GET_REVENUE_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getSales: (data) => {
    return {
      type: actions.GET_SALES_REQUEST,
      data
    };
  },
  getCounters: (data) => {
    return {
      type: actions.GET_COUNTER_REQUEST,
      data
    };
  },
  getRevenue: (data) => {
    return {
      type: actions.GET_REVENUE_REQUEST,
      data
    };
  },
  getProfit: (data) => {
    return {
      type: actions.GET_PROFIT_REQUEST,
      data
    };
  },
};
