import { all, fork, put, takeLatest } from "redux-saga/effects";
import { Toast } from "utils/toast";
import { loaderAction } from "./action";

export function* startLoader() {
  yield takeLatest(loaderAction.START_LOADER, function* () {
    try {
      yield put({
        type: loaderAction.START_LOADER_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      Toast("error", error);
    }
  });
}

export function* closeLoader() {
  yield takeLatest(loaderAction.CLOSE_LOADER, function* () {
    try {
      yield put({
        type: loaderAction.CLOSE_LOADER_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      Toast("error", error);
    }
  });
}

export default function* loaderSaga() {
  yield all([fork(startLoader), fork(closeLoader)]);
}
