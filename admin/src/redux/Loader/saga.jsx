import { all, fork, put, takeLatest } from "redux-saga/effects";
import { Toast } from "utils/toast";
import { actions } from "./action";

export function* startLoader() {
  yield takeLatest(actions.START_LOADER, function* () {
    try {
      yield put({
        type: actions.START_LOADER_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      Toast("error", error);
    }
  });
}

export function* closeLoader() {
  yield takeLatest(actions.CLOSE_LOADER, function* () {
    try {
      yield put({
        type: actions.CLOSE_LOADER_SUCCESS,
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
