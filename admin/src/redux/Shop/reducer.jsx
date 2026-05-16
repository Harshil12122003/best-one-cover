// import setToken from "utils/setToken";
import { shopActions } from "./action";

const initialState = {
  shops: [],
  shop: null,
  shopCounters: [],
  expenses: [],
  error: false,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case shopActions.ADD_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload,

      };
    case shopActions.EDIT_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload,
        shops: state.shops.map((shop)=>{
          if(shop._id === action.payload._id){
            shop = action.payload;
          }
          return shop;
        })
      };
    case shopActions.GET_SINGLE_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload,

      };


    case shopActions.GET_SHOP_SUCCESS:
      return {
        ...state,
        shops: action.payload,
      };

    case shopActions.DELETE_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload,
        shops: state.shops.filter((shop) => {
          return shop?._id !== action.payload?._id;
        })
      };

    case shopActions.GET_SHOPS_COUNTER_SUCCESS:
      return {
        ...state,
        shopCounters: action.payload,
      };

    case shopActions.GET_SHOPS_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: action.payload,
      };

    case shopActions.CATCH_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default shopReducer;