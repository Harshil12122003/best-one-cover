import { all, fork, put, takeLatest } from "redux-saga/effects";
import { postQuery } from "utils/api";
import { Toast } from "utils/toast";
import { authActions } from "./action";


export function* adminLogin() {
  yield takeLatest(authActions.ADMIN_LOGIN_REQUEST, function* ({ data }) {
    // console.log("LoginData^^^^^",data)
    try {
      const response = yield postQuery(`/admin/login`, data);
      console.log("responseLogin",response)
      yield put({
        type: authActions.ADMIN_LOGIN_SUCCESS,
        payload: response?.data?.body?.result?.admin,
        token: response?.data?.body?.result?.token,
      });
      const setToken = response?.data?.body?.result?.token;
      // console.log('setToken', setToken)

      localStorage.setItem("ADMIN_TOKEN", setToken);

      Toast("success", "Admin Login Successfully");
    } catch (error) {
      localStorage.removeItem("ADMIN_TOKEN");
      console.log(error);
      if (error) {
        const errorMsg = error.response.data.body.message;
        Toast("error", errorMsg);
      }
    }
  });
}

export function* adminLogout() {
  yield takeLatest(authActions.ADMIN_LOGOUT_REQUEST, function* () {
    try {
      yield put({
        type: authActions.ADMIN_LOGOUT_SUCCESS,
      });
      localStorage.removeItem("ADMIN_TOKEN");
      Toast("success", "LogOut Successfully");
    } catch (e) {
      console.log(e);
    }
  });
}

export default function* authSaga() {
  yield all([
     fork(adminLogin),
     fork(adminLogout)
    ]);
}
