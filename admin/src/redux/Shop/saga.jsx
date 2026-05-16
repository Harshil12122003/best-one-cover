import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { shopActions } from "./action";
import { actions as loaderAction } from "redux/Loader/action";

export function* addShop() {
  yield takeLatest(shopActions.ADD_SHOP_REQUEST, function* ({ addShopData, navigate }) {
    try {
      const response = yield postQuery(`/shop/new`, addShopData);
      if (!response.data.error) {
        yield put({
          type: shopActions.ADD_SHOP_SUCCESS,
          payload: response?.data?.body?.result?.shop,
        });
        Toast("success", "Shop Added Successfully!");
      navigate("/shops");
      }
    } catch (error) {
      console.log(error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* editShop() {
  yield takeLatest(
    shopActions?.EDIT_SHOP_REQUEST,
    function* ({ editData, id }) {
      try {
        const response = yield putQuery(`/shop/${id}`, editData);
        if (!response.data.error) {
          yield put({
            type: shopActions?.EDIT_SHOP_SUCCESS,
            payload: response?.data?.body?.result,
          });
          Toast("success", "Shop Edited Successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
}
export function* getShop() {
  yield takeLatest(shopActions.GET_SHOP_REQUEST, function* () {
    try {
      const response = yield getQuery(`/shops`);
      if (!response.data.error) {
        yield put({
          type: shopActions.GET_SHOP_SUCCESS,
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

export function* getSingleShop() {
  yield takeLatest(
    shopActions.GET_SINGLE_SHOP_REQUEST,
    function* ({ singleData }) {
      try {
        const response = yield getQuery(`/shop/${singleData}`);
        // console.log("responseGetsingleshop",response)
        yield put({
          type: shopActions?.GET_SINGLE_SHOP_SUCCESS,
          payload: response?.data?.body?.result,
        });
        yield put({
          type: loaderAction.CLOSE_LOADER,
          payload: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* deleteShop() {
  yield takeLatest(
    shopActions.DELETE_SHOP_REQUEST,
    function* ({ data, navigate }) {
      // console.log("data@@@@",data)
      try {
        const response = yield deleteQuery(`shop/${data}`);

        if (!response.data.error) {
          yield put({
            type: shopActions.DELETE_SHOP_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Shop Deleted Successfully!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* getShopCounters() {
  yield takeLatest(shopActions.GET_SHOPS_COUNTER_REQUEST, function* ({ data }) {
    try {
      console.log(data);
      let endPoint = "/counters";
      if (data && data?.username) {
        endPoint = `/counters?username=${data?.username}`;
      }
      if (data && data?.startDate && data?.endDate) {
        endPoint = `/counters?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      if ((data && data?.shopId !== "") || (data?.shopId && data)) {
        endPoint = `/counters?shopId=${data?.shopId}`;
      }

      if (data && data?.startDate && data?.endDate && data?.shopId !== "") {
        console.log(data);
        endPoint = `/counters?startDate=${data?.startDate}&endDate=${data?.endDate}&shopId=${data?.shopId}`;
      }
      console.log(endPoint);
      const response = yield getQuery(endPoint);
      if (!response.data.error) {
        yield put({
          type: shopActions.GET_SHOPS_COUNTER_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getShopExpenses() {
  yield takeLatest(shopActions.GET_SHOPS_EXPENSE_REQUEST, function* ({ data }) {
    try {
      console.log(data);
      let endPoint = "/expenses";
      if (data && data?.username) {
        endPoint = `/expenses?username=${data?.username}`;
      }
      if (data && data?.startDate && data?.endDate) {
        endPoint = `/expenses?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      if ((data && data?.shopId !== "") || (data?.shopId && data)) {
        endPoint = `/expenses?shopId=${data?.shopId}`;
      }

      if (data && data?.startDate && data?.endDate && data?.shopId !== "") {
        console.log(data);
        endPoint = `/expenses?startDate=${data?.startDate}&endDate=${data?.endDate}&shopId=${data?.shopId}`;
      }
      console.log(endPoint);
      const response = yield getQuery(endPoint);
      if (!response.data.error) {
        yield put({
          type: shopActions.GET_SHOPS_EXPENSE_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export default function* shopSaga() {
  yield all([
    fork(addShop),
    fork(getShop),
    fork(getSingleShop),
    fork(deleteShop),
    fork(editShop),
    fork(getShopCounters),
    fork(getShopExpenses),
  ]);
}
