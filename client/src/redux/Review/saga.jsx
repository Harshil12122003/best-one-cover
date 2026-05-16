import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
import { loaderAction } from "redux/Loader/action";
// import loaderAction from "redux/Loader/action";

export function* getReviews() {
  yield takeLatest(actions.GET_REVIEWS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`/feedback/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_REVIEWS_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}


export function* createReview() {
  yield takeLatest(
    actions.CREATE_REVIEW_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`feedback/new`, data);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_REVIEW_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Review Submitted Successfully!")
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* getMyReviews() {
  yield takeLatest(actions.GET_MY_REVIEWS_REQUEST, function* () {
    try {
      const response = yield getQuery(`/myFeedbacks`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_MY_REVIEWS_SUCCESS,
          payload: response.data.body.result,
        });
        yield put({
          type: loaderAction.CLOSE_LOADER,
          payload: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* updateReview() {
  yield takeLatest(
    actions.UPDATE_REVIEW_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield putQuery(`feedback/${data.feedbackId}`, data);

        if (!response.data.error) {
          yield put({
            type: actions.UPDATE_REVIEW_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Review Updated Successfully!")
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* deleteReview() {
  yield takeLatest(
    actions.DELETE_REVIEW_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`feedback/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_REVIEW_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Review Deleted Successfully!")
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}


export default function* reviewSaga() {
  yield all([
    fork(getReviews),
    fork(createReview),
    fork(updateReview),
    fork(deleteReview),
    fork(getMyReviews),
  ]);
}
