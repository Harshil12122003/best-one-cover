import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  orders: [],
  order: null,
  payment: null,
  error: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    case actions.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };
    case actions.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        orders: [action.payload, ...state.orders],
      };
    case actions.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        orders: state.orders.map((order)=>{
          if (order._id === action.payload._id) {
            order = action.payload;
          }
          return order
          // return order._id !== action.payload._id;
        })
      };
    case actions.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: action.payload,
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

export default orderReducer;