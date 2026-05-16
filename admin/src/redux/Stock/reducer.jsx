import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  stocks: [],
  stock: null,
  error: false,
};

const stockReducer = (state = initialState, action) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case actions.GET_STOCK_SUCCESS:
      return {
        ...state,
        stocks: action.payload,
      };

    case actions.GET_SINGLE_STOCK_SUCCESS:
      return {
        ...state,
        stock: action.payload,
      };

    case actions.CREATE_STOCK_SUCCESS:
      return {
        ...state,
        stock: action.payload,
        stocks: [action.payload, ...state.stocks]
      };

    case actions.UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        stock: action.payload,
        // stocks: [action.payload, ...state.stocks]
      };


    case actions.DELETE_STOCK_SUCCESS:
      return {
        ...state,
        stock: action.payload,
        stocks: state.stocks.filter((stock) => {
          return stock?._id !== action.payload?._id;
        })
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

export default stockReducer;