import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  sales: [],
  counters: [],
  revenueOnline: [],
  revenueOffline: [],
  profit: [],
  error: false,
};

const reportsReducer = (state = initialState, action) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case actions.GET_SALES_SUCCESS:
      return {
        ...state,
        sales: action.payload,
      };

    case actions.GET_COUNTER_SUCCESS:
      return {
        ...state,
        counters: action.payload,
      };

    case actions.GET_REVENUE_SUCCESS:
      return {
        ...state,
        revenueOffline: action.payload.revenueOffline,
        revenueOnline: action.payload.revenueOnline,
      };

    case actions.GET_PROFIT_SUCCESS:
      return {
        ...state,
        profit: action.payload,
      };

    case actions.CATCH_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reportsReducer;