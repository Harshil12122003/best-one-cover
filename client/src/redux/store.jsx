import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from 'redux-logger'
const sagaMiddleware = createSagaMiddleware();
 
// const persistConfig = {
//   key: 'root',
//   storage,
// }

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  }
};
// const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
