import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
import {actions as loaderAction} from "redux/Loader/action";

export function* getOrders() {
  yield takeLatest(actions.GET_ORDERS_REQUEST, function* ({ data }) {
    try {
      let endPoint = "/orders";
      if (data?.username) {
        endPoint = `/orders?username=${data?.username}`;
      }
      if (data?.startDate && data?.endDate) {
        endPoint = `/orders?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      if (data?.orderStatus) {
        endPoint = `/orders?orderStatus=${data?.orderStatus}`;
      }

      if (data?.paymentStatus) {
        endPoint = `/orders?paymentStatus=${data?.paymentStatus}`;
      }

      if (data?.startDate && data?.endDate && data?.orderStatus) {
        endPoint = `/orders?startDate=${data?.startDate}&endDate=${data?.endDate}&orderStatus=${data?.orderStatus}`;
      }

      const response = yield getQuery(endPoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_ORDERS_SUCCESS,
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

export function* getOrderDetails() {
  yield takeLatest(actions.GET_ORDER_DETAILS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`order/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_ORDER_DETAILS_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getShopOrderDetails() {
  yield takeLatest(actions.GET_SHOP_ORDER_DETAILS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`shopOrder/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_SHOP_ORDER_DETAILS_SUCCESS,
          payload: response.data.body.result,
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
            payload: response.data.result,
          });
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
            payload: response.data.result,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* updateOrder() {
  yield takeLatest(
    actions.UPDATE_ORDER_STATUS_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield putQuery(`order/${data.id}`, data);
        if (!response.data.error) {
          yield put({
            type: actions.UPDATE_ORDER_STATUS_SUCCESS,
            payload: response.data.body.result,
          });
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
      }
    }
  );
}

export function* updateShopOrder() {
  yield takeLatest(
    actions.UPDATE_SHOP_ORDER_STATUS_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield putQuery(`shopOrder/${data.id}`, data);
        if (!response.data.error) {
          yield put({
            type: actions.UPDATE_SHOP_ORDER_STATUS_SUCCESS,
            payload: response.data.body.result,
          });
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
      }
    }
  );
}

export function* deleteShopOrder() {
  yield takeLatest(
    actions.DELETE_SHOP_ORDER_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`shopOrder/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_SHOP_ORDER_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Order Deleted Successfully!");
        }

      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);

      }
    }
  );
}

export function* deleteOrder() {
  yield takeLatest(
    actions.DELETE_ORDER_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`order/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_ORDER_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Order Deleted Successfully!");
        }

      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);

      }
    }
  );
}

export function* getShopOrders() {
  yield takeLatest(actions.GET_SHOP_ORDERS_REQUEST, function* ({ data }) {
    try {
      let endPoint = "/shopOrders";
      if (data?.username) {
        endPoint = `/shopOrders?username=${data?.username}`;
      }
      if (data?.startDate && data?.endDate) {
        endPoint = `/shopOrders?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }
      if (data?.shopId) {
        endPoint = `/shopOrders?shopId=${data?.shopId}`;
      }
      if (data?.startDate && data?.endDate && data?.shopId) {
        endPoint = `/shopOrders?startDate=${data?.startDate}&endDate=${data?.endDate}&shopId=${data?.shopId}`;
      }

      if (data?.orderStatus) {
        endPoint = `/shopOrders?orderStatus=${data?.orderStatus}`;
      }

      const response = yield getQuery(endPoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_SHOP_ORDERS_SUCCESS,
          payload: response.data.body.result,
        });
        yield put({
          type: loaderAction.CLOSE_LOADER,
          payload: false,
        });
      }
    } catch (e) {
      console.log(e);
      Toast("error", e.response.data.body.message);

    }
  });
}

export function* getNotifications() {
  yield takeLatest(actions.GET_NOTIFICATIONS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`notifications`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_NOTIFICATIONS_SUCCESS,
          payload: response?.data?.body?.result,
        });
      }
    } catch (e) {
      console.log(e);
      Toast("error", e?.response?.data?.body?.message);

    }
  });
}



export default function* orderSaga() {
  yield all([
    fork(getOrders),
    fork(getOrderDetails),
    fork(createOrder),
    fork(deleteOrder),
    fork(updateOrder),
    fork(updateShopOrder),
    fork(deleteShopOrder),
    fork(createPayment),
    fork(getShopOrders),
    fork(getNotifications),
    fork(getShopOrderDetails),
  ]);
}
