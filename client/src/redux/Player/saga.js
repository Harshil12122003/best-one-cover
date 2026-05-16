import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
// import loaderAction from "redux/Loader/action";

export function* createPlayers() {
  yield takeLatest(
    actions.CREATE_PLAYERS_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`registrationViaControlCentral`, data);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_PLAYERS_SUCCESS,
            payload: response.data.result.user,
          });
          if (response.data.result.existUsers.length > 0) {
            let userExists = "";
            for (const item of response.data.result.existUsers) {
              userExists += item.user + "\n";
            }
            Toast("error", "Below Players are already exist!! \n" + userExists);
          }
          if (response.data.result.errors.length > 0) {
            let userUndefined = "";
            for (const item of response.data.result.undefinedUsers) {
              userUndefined += item.error + " in this " + item?.user + ".\n";
            }
            Toast(
              "success",
              userUndefined + "\nOther Players Submitted Successfully!!"
            );
          }
          if (
            response.data.result.errors.length <= 0 &&
            response.data.result.existUsers.length <= 0
          ) {
            Toast("success", "Player details submitted successfully");
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* getPlayers() {
  yield takeLatest(actions.GET_PLAYERS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(
        `users/controlCenter?clubId=${data?.club?.id}`
      );
      if (!response.data.error) {
        yield put({
          type: actions.GET_PLAYERS_SUCCESS,
          payload: response.data.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* updatePlayer() {
  yield takeLatest(actions.UPDATE_PLAYER_REQUEST, function* ({ data }) {
    try {
      const response = yield putQuery(`updateControlCenterUser`, data);
      if (!response.data.error) {
        yield put({
          type: actions.UPDATE_PLAYER_SUCCESS,
          payload: response.data.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getClub() {
  yield takeLatest(actions.GET_CLUB_REQUEST, function* () {
    try {
      const response = yield getQuery(`club`);

      if (!response.data.error) {
        yield put({
          type: actions.GET_CLUB_SUCCESS,
          payload: response.data.result.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getAllPlayers() {
  yield takeLatest(actions.GET_ALL_PLAYERS_REQUEST, function* ({ data }) {
    try {
      let query = `players?keyword=${data.keyword}&limit=18&skip=${data.skip}`;
      if (data.clubId) {
        query = `players?clubId=${data.clubId}&keyword=${data.keyword}&limit=18&skip=${data.skip}`;
      }
      const response = yield postQuery(query, data.body);
      if (!response.data.error) {
        yield put({
          type: actions.GET_ALL_PLAYERS_SUCCESS,
          payload: response.data.result.user,
        });
      }
    } catch (e) {
      yield put({
        type: actions.CATCH_ERROR,
        payload: true,
      });
      yield put({
        type: actions.GET_ALL_PLAYERS_SUCCESS,
        payload: [],
      });
      console.log(e);
    }
  });
}

export default function* playerSaga() {
  yield all([
    fork(getPlayers),
    fork(createPlayers),
    fork(updatePlayer),
    fork(getClub),
    fork(getAllPlayers),
  ]);
}
