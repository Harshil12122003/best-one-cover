import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
import { loaderAction } from "redux/Loader/action";

export function* getBrands() {
  yield takeLatest(actions.GET_BRANDS_REQUEST, function* () {
    try {
      const response = yield getQuery(`brands`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_BRANDS_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getCategories() {
  yield takeLatest(actions.GET_CATEGORY_REQUEST, function* () {
    try {
      const response = yield getQuery(`categories`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_CATEGORY_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getProducts() {
  yield takeLatest(actions.GET_PRODUCTS_REQUEST, function* ({ data }) {
    try {
      let endpoint = "";
      endpoint = "products"
      if (data?.page) {
        endpoint = `products?page=${data.page}&bId=${data.bId}&mId=${data.mId}`;
      } if (data?.keyword) {
        endpoint = `products?page=${data?.page}&keyword=${data?.keyword}`
      } if (data?.bId && data?.mId) {
        endpoint = `products?page=${data.page}&bId=${data.bId}&mId=${data.mId}`;
      }
      delete data?.page;
      const response = yield postQuery(endpoint, data);
      // if (!response.data.error) {
      yield put({
        type: actions.GET_PRODUCTS_SUCCESS,
        payload: response.data.body.result,
      });
      // }

      yield put({
        type: loaderAction.CLOSE_LOADER,
        payload: false,
      });
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getProductDetails() {
  yield takeLatest(actions.GET_PRODUCT_DETAILS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`product/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_PRODUCT_DETAILS_SUCCESS,
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


export default function* productsSaga() {
  yield all([
    fork(getBrands),
    fork(getProducts),
    fork(getProductDetails),
    fork(getCategories),
  ]);
}
