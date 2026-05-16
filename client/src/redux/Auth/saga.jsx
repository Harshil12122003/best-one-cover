import { all, fork, put, takeLatest } from "redux-saga/effects";
import { postQuery } from "utils/api";
import { Toast } from "utils/toast";
import { authActions } from "./action";
import { loaderAction } from "redux/Loader/action";

export function* Registration() {
  yield takeLatest(authActions.REGISTRATION_REQUEST, function* ({ data, navigate }) {
    try {
      const response = yield postQuery(`/auth/register`, data);

      yield put({
        type: authActions.REGISTRATION_SUCCESS,
        payload: response?.data?.body?.result?.user,
        token: response?.data?.body?.result?.token,
      });
      yield put({
        type: loaderAction.CLOSE_LOADER,
        payload: false,
      });
      const setToken = response.data.body.result.token;
      // Cookies.set("token",setToken);
      // localStorage.setItem("TOKEN", setToken);
      Toast("success", "Register Successfully");
      navigate("/signin")
    } catch (error) {
      console.log("error", error);
      yield put({
        type: authActions.REGISTRATION_ERROR,
        payload: error?.response?.data?.body?.message,
      });
      if (error) {
        const signInSuccessMsg = error?.response?.data?.body?.message;
        Toast("error", signInSuccessMsg);
      }
    }
  });
}

export function* Login() {
  yield takeLatest(authActions.LOGIN_REQUEST, function* ({ data, navigate }) {
    try {
      const response = yield postQuery(`/auth/login`, data);
      yield put({
        type: authActions.LOGIN_SUCCESS,
        payload: response?.data?.body?.result?.user,
        token: response?.data?.body?.result?.token,
      });
      yield put({
        type: loaderAction.CLOSE_LOADER,
        payload: false,
      });
      const setToken = response?.data?.body?.result?.token;
      // Cookies.set("token",setToken);

      localStorage.setItem("TOKEN", setToken);
      navigate("/signin")
      Toast("success", "Login Successfully");
    } catch (error) {
      localStorage.removeItem("TOKEN");
      console.log(error);
      yield put({
        type: authActions.LOGIN_ERROR,
        payload: error?.response?.data?.body?.message,
      });
      if (error) {
        const errorMsg = error.response.data.body.message;
        Toast("error", errorMsg);
        yield put({
          type: loaderAction.CLOSE_LOADER,
          payload: false,
        });
      }
    }
  });
}


export default function* authSaga() {
  yield all([
    fork(Login),
    fork(Registration),
  ]);
}
