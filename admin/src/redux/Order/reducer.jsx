import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  orders: [],
  order: null,
  payment: null,
  shopOrders: [],
  shopOrder: null,
  notifications: [],
  error: false,
};

const orderReducer = (state = initialState, action) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
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

    case actions.GET_SHOP_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        shopOrder: action.payload,
      };

    case actions.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        orders: [...action.payload, ...state.orders],
      };
    case actions.UPDATE_ORDER_STATUS_SUCCESS:
      const data = state.orders.map((order) => {
        if (order?._id === action.payload._id) {
          order.orderStatus = action.payload.orderStatus;
        }

        return order;
      });

      return {
        ...state,
        order: action.payload,
        orders: [...data],
      };
    case actions.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        orders: state.orders.filter((order) => {
          return order?._id !== action.payload?._id;
        }),
      };

    case actions.UPDATE_SHOP_ORDER_STATUS_SUCCESS:
      const dataShopOrders = state.shopOrders.map((order) => {
        if (order?._id === action.payload._id) {
          order.orderStatus = action.payload.orderStatus;
        }

        return order;
      });

      return {
        ...state,
        shopOrder: action.payload,
        shopOrders: [...dataShopOrders],
      };

    case actions.DELETE_SHOP_ORDER_SUCCESS:
      return {
        ...state,
        shopOrder: action.payload,
        shopOrders: state.shopOrders.filter((order) => {
          return order?._id !== action.payload?._id;
        }),
      };

    case actions.CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: action.payload,
      };

    case actions.GET_SHOP_ORDERS_SUCCESS:
      return {
        ...state,
        shopOrders: action.payload,
      };

    case actions.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
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
