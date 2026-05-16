import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  customers: [],
  customer: null,
  managers: [],
  manager: null,
  error: false,
};

const customerReducer = (state = initialState, action) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case actions.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      };
    case actions.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        customers: state.customers.filter((customer) => {
          return customer?._id !== action.payload?._id;
        })
      };

    case actions.GET_MANAGERS_SUCCESS:
      return {
        ...state,
        managers: action.payload,
      };

    case actions.DELETE_MANAGER_SUCCESS:
      return {
        ...state,
        manager: action.payload,
        managers: state.managers.filter((manager) => {
          return manager?._id !== action.payload?._id;
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

export default customerReducer;