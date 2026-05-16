import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { adminActions } from "./action";

export function* adminDetail() {
  yield takeLatest(adminActions.ADMIN_DETAIL_REQUEST, function* () {
    try {
      const response = yield getQuery(`/admin/profile`);
      yield put({
        type: adminActions.ADMIN_DETAIL_SUCCESS,
        payload: response?.data?.body?.result,
      });
    } catch (error) {
      console.log(error);
    }
  });
}

export function* adminEditProfile() {
  yield takeLatest(adminActions.EDIT_ADMIN_PROFILE_REQUEST, function* ({data}) {
    try {
      const response = yield putQuery(`/admin/updateProfile`, data);
      yield put({
        type: adminActions.EDIT_ADMIN_PROFILE_SUCCESS,
        payload: response?.data?.body?.result,
      });
      Toast("success", "Profile Updated Successfully")
    } catch (error) {
      console.log(error);
    }
  });
}

export function* adminChangePassword() {
  yield takeLatest(
    adminActions.CHANGE_PASSWORD_REQUEST,
    function* ({ forgotPwd }) {
      try {
        const response = yield putQuery(`/admin/updatePassword`, forgotPwd);
        yield put({
          type: adminActions.CHANGE_PASSWORD_SUCCESS,
          payload: response?.data?.body?.result,
        });
        Toast("success", "Password Updated Successfully")
      } catch (error) {
        console.log(error);
        Toast("error", error?.response?.data?.body?.message)
      }
    }
  );
}

export default function* adminSaga() {
  yield all([
    fork(adminDetail),
    fork(adminEditProfile),
    fork(adminChangePassword),
    // fork(userAddressManage),
  ]);
}
