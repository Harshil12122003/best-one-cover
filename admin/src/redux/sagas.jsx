import { all } from "redux-saga/effects";
import authSaga from "./Auth/saga";
import cartSaga from "./Cart/saga";
import customerSaga from "./Customers/saga";
import orderSaga from "./Order/saga";
import productsSaga from "./Products/saga";
import stockSaga from "./Stock/saga";
import loaderSaga from "./Loader/saga";
import shopSaga from "./Shop/saga";
import reportsSaga from "./Reports/saga";
import adminSaga from "./Admin/saga";

export default function* rootSaga() {
  yield all([productsSaga(), cartSaga(), adminSaga(), orderSaga(), authSaga(), customerSaga(), stockSaga(), loaderSaga(), shopSaga(), reportsSaga()]);
}
