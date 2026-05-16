import { all, fork, put, takeLatest, select } from "redux-saga/effects";
import { getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
// import loaderAction from "redux/Loader/action";

export function* addItemsToCart() {
  yield takeLatest(actions.ADD_TO_CART_REQUEST, function* ({data}) {
    try {
      // const response = yield getQuery(`brands`);
      // if (!response.data.error) {
        yield put({
          type: actions.ADD_TO_CART_SUCCESS,
          payload: data,
        });

        let {cartItems} = yield select((state)=>state.cart);
        localStorage.setItem("cart", JSON.stringify(cartItems))
      // }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* removeItemsFromCart() {
  yield takeLatest(actions.REMOVE_CART_ITEM_REQUEST, function* ({data}) {
    try {
      // const response = yield getQuery(`brands`);
      // if (!response.data.error) {
        yield put({
          type: actions.REMOVE_CART_ITEM_SUCCESS,
          payload: data,
        });
      // }
      let {cartItems} = yield select((state)=>state.cart);
      localStorage.setItem("cart", JSON.stringify(cartItems))
      Toast("success", "Item Removed Successfully");
    } catch (e) {
      console.log(e);
    }
  });
}


export default function* cartSaga() {
  yield all([
    fork(addItemsToCart),
    fork(removeItemsFromCart),
  ]);
}
