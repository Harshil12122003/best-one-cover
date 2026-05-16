import { all } from "redux-saga/effects";
import authSaga from "./Auth/saga";
import cartSaga from "./Cart/saga";
import orderSaga from "./Order/saga";
import productsSaga from "./Products/saga";
import reviewSaga from "./Review/saga";
import userSaga from "./User/saga";
import loaderSaga from "./Loader/saga";
// import cvSaga from "./CV/saga";
// import loaderSaga from "./Loader/saga";
// import messageSaga from "./Message/saga";
// import playerSaga from "./Player/saga";

export default function* rootSaga() {
  yield all([productsSaga(), cartSaga() ,userSaga(), orderSaga(), authSaga(), reviewSaga(), loaderSaga()]);
}
