import { combineReducers } from "redux";
import AuthReducer from "./Auth/reducer";
import adminReducer from "./Admin/reducer";
import cartReducer from "./Cart/reducer";
import orderReducer from "./Order/reducer";
import productReducer from "./Products/reducer";
import customerReducer from "./Customers/reducer";
import stockReducer from "./Stock/reducer";
import loaderReducer from "./Loader/reducer";
import shopReducer from "./Shop/reducer";
import reportsReducer from "./Reports/reducer";
// import cvReducer from "./CV/reducer";
// import messageReducer from "./Message/reducer";
// import playerReducer from "./Player/reducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  admin : adminReducer,
  order: orderReducer,
  auth : AuthReducer,
  customer : customerReducer,
  stock : stockReducer,
  loader: loaderReducer,
  shop: shopReducer,
  report: reportsReducer,
});

export default rootReducer;
