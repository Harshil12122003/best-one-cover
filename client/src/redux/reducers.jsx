import { combineReducers } from "redux";
import AuthReducer from "./Auth/reducer";
import userReducer from "./User/reducer";
import cartReducer from "./Cart/reducer";
import orderReducer from "./Order/reducer";
import productReducer from "./Products/reducer";
import reviewReducer from "./Review/reducer";
import loaderReducer from "./Loader/reducer";
// import cvReducer from "./CV/reducer";
// import loaderReducer from "./Loader/reducer";
// import messageReducer from "./Message/reducer";
// import playerReducer from "./Player/reducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user : userReducer,
  order: orderReducer,
  auth : AuthReducer,
  loader: loaderReducer,
  review: reviewReducer,
});

export default rootReducer;
