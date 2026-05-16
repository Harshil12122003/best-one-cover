import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
import {actions as loaderAction} from "redux/Loader/action";
import io from "socket.io-client";
const socket = io.connect("https://best-1-backend.onrender.com");

export function* getStock() {
  yield takeLatest(actions.GET_STOCK_REQUEST, function* ({keyword}) {
    try {
      let endpoint = "/stocks"
      if(keyword){
      endpoint = `/stocks?keyword=${keyword}`
      }
      const response = yield getQuery(endpoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_STOCK_SUCCESS,
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

export function* getSingleStock() {
  yield takeLatest(actions.GET_SINGLE_STOCK_REQUEST, function* ({data}) {
    try {
      const response = yield getQuery(`stock/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_SINGLE_STOCK_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* createStock() {
  yield takeLatest(
    actions.CREATE_STOCK_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`stock/new`, data);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_STOCK_SUCCESS,
            payload: response?.data?.body?.result,
          });
          yield put({
            type: loaderAction.CLOSE_LOADER,
            payload: false,
          });
          Toast("success", "Stock Added Successfully!");
          socket.emit("newStock", {
            stock: response?.data?.body?.result,
            message:
              "Added new stock of " +
              response?.data?.body?.result?.model?.name + " by admin ",
            // userId: response?.data?.body?.result?.shop,
            shop: false,
            stockId: response?.data?.body?.result?._id,
            time: new Date(),
          });
          navigate("/stocks")
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
        yield put({
          type: loaderAction.CLOSE_LOADER,
          payload: false,
        });
      }
    }
  );
}


export function* updateStock() {
  yield takeLatest(
    actions.UPDATE_STOCK_REQUEST,
    function* ({ data, navigate }) {
      console.log('data', data)
      try {
        const response = yield putQuery(`stock/${data.id}`, data.myForm);

        if (!response.data.error) {
          yield put({
            type: actions.UPDATE_STOCK_SUCCESS,
            payload: response.data.body.result,
          });
          yield put({
            type: loaderAction.CLOSE_LOADER,
            payload: false,
          });
          Toast("success", "Stock Updated Successfully!");
          navigate("/stocks")
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
        yield put({
          type: loaderAction.CLOSE_LOADER,
          payload: false,
        });
      }
    }
  );
}

export function* deleteStock() {
  yield takeLatest(
    actions.DELETE_STOCK_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`stock/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_STOCK_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Stock Deleted Successfully!");
        }

      } catch (e) {
        console.log(e);
      }
    }
  );
}


export default function* stockSaga() {
  yield all([
    fork(getStock),
    fork(getSingleStock),
    fork(createStock),
    fork(updateStock),
    fork(deleteStock),
  ]);
}
