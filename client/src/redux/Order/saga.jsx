import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
// import loaderAction from "redux/Loader/action";
import io from 'socket.io-client';
import { loaderAction } from "redux/Loader/action";
const socket = io.connect('https://best-1-backend.onrender.com');

export function* getOrders() {
  yield takeLatest(actions.GET_ORDERS_REQUEST, function* () {
    try {
      const response = yield getQuery(`/myorders`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_ORDERS_SUCCESS,
          payload: response?.data?.body?.result,
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

export function* getOrderDetails() {
  yield takeLatest(actions.GET_ORDER_DETAILS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`order/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_ORDER_DETAILS_SUCCESS,
          payload: response?.data?.body?.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* createOrder() {
  yield takeLatest(
    actions.CREATE_ORDER_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`order/new`, data);
        if (!response.data.error) {
          yield put({
            type: actions.CREATE_ORDER_SUCCESS,
            payload: response?.data?.body?.result,
          });
          yield put({
            type: loaderAction.CLOSE_LOADER,
            payload:false,
          });
          socket.emit('newOrder', { order: response?.data?.body?.result, message: "You Have received new order from " + response?.data?.body?.result?.shippingInfo?.name, userId: response?.data?.body?.result?.userId, shop: false, time: new Date() });
          navigate("/orders");
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* createPayment() {
  yield takeLatest(
    actions.CREATE_PAYMENT_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`payment/new`, data);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_PAYMENT_SUCCESS,
            payload: response?.data?.body?.result,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

// export function* updateOrder() {
//   yield takeLatest(
//     actions.CREATE_ORDER_REQUEST,
//     function* ({ data, navigate }) {
//       try {
//         const response = yield postQuery(`order/new`, data);

//         if (!response.data.error) {
//           yield put({
//             type: actions.CREATE_ORDER_SUCCESS,
//             payload: response.data.result,
//           });
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   );
// }

export function* deleteOrder() {
  yield takeLatest(
    actions.DELETE_ORDER_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`order/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_ORDER_SUCCESS,
            payload: response?.data?.body?.result,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}


export default function* orderSaga() {
  yield all([
    fork(getOrders),
    fork(getOrderDetails),
    fork(createOrder),
    fork(deleteOrder),
    fork(createPayment),
  ]);
}
