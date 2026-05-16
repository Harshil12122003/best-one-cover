// import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  brands: [],
  categories: [],
  products: [],
  product: {},
  error: false,
};

const productReducer = (state = initialState, action) => {
  // const token = localStorage.getItem("TOKEN");
  // if (token) {
  //   setToken(token);
  // }
  switch (action.type) {
    case actions.GET_BRANDS_SUCCESS:

      return {
        ...state,
        brands: action.payload,
      };

    case actions.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case actions.GET_PRODUCTS_SUCCESS:

      return {
        ...state,
        products: action.payload,
      };

    case actions.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
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

export default productReducer;