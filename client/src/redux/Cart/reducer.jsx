import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  cartItems: [],
  error: false,
};

const cartReducer = (state = initialState, action) => {

  // const token = localStorage.getItem("TOKEN");
  // if (token) {
  //   setToken(token);
  // }
  switch (action.type) {
    case actions.ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const isItemExist = state.cartItems.find(i => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i._id === isItemExist._id ? item : i
          )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case actions.REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i._id !== action.payload),
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

export default cartReducer;
