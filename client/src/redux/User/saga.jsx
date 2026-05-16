import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { userActions } from "./action";
import { loaderAction } from "redux/Loader/action";

export function* userDetail() {
  yield takeLatest(userActions.USER_DETAIL_REQUEST, function* () {
    try {
      const response = yield getQuery(`/user/profile`);

      yield put({
        type: userActions.USER_DETAIL_SUCCESS,
        payload: response?.data?.body?.result,
      });
      yield put({
        type: loaderAction.CLOSE_LOADER,
        payload: false,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: userActions.USER_DETAIL_ERROR,
        payload: error?.response?.data?.body?.message,
      });
    }
  });
}

export function* EditProfile() {
  yield takeLatest(userActions.EDIT_USER_PROFILE_REQUEST, function* ({ data }) {
    try {
      const response = yield putQuery(`/user/updateProfile`, data);
      yield put({
        type: userActions.EDIT_USER_PROFILE_SUCCESS,
        payload: response?.data?.body?.result,
      });
    } catch (error) {
      console.log(error);
      // yield put({
      //   type: userActions.EDIT_USER_PROFILE_ERROR,
      //   payload: error?.message,
      // });
    }
  });
}



export function* ChangePassword() {
  yield takeLatest(
    userActions.CHANGE_PASSWORD_REQUEST,
    function* ({ forgotPwd }) {
      try {

        const response = yield putQuery(`/user/updatePassword`, forgotPwd);
        // yield put({
        //   type: userActions.CHANGE_PASSWORD_SUCCESS,
        //   payload: response,
        // });
        localStorage.removeItem("TOKEN");
        Toast("success", "Password Updated Successfully");
      } catch (error) {
        console.log(error);
        yield put({
          type: userActions.CHANGE_PASSWORD_ERROR,
          payload: error?.response?.data?.body?.message,
        });
        Toast("error", error?.response?.data?.body?.message)
      }
    });
}


export function* contactUs() {
  yield takeLatest(userActions.CONTACTUS_REQUEST, function* ({ data }) {
    try {
      const response = yield postQuery(`/contact/new`, data);
      yield put({
        type: userActions.CONTACTUS_SUCCESS,
        payload: response
      })
      Toast("success", "Message Send Successfully")

    } catch (error) {
      console.log(error)
    }
  })
}

export default function* userSaga() {
  yield all([
    fork(userDetail),
    fork(EditProfile),
    fork(ChangePassword),
    fork(contactUs),

    // fork(userAddressManage),
  ]);
}
