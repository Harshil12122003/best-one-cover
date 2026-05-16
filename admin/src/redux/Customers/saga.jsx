import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery} from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
import {actions as loaderAction} from "redux/Loader/action";

export function* getCustomers() {
  yield takeLatest(actions.GET_CUSTOMERS_REQUEST, function* ({userName}) {
    try {
      let endpoint = "/users"
      if (userName) {
        endpoint = `/users?username=${userName}`
      }
      const response = yield getQuery(endpoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_CUSTOMERS_SUCCESS,
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

// export function* getOrderDetails() {
//   yield takeLatest(actions.GET_ORDER_DETAILS_REQUEST, function* ({data}) {
//     try {
//       const response = yield getQuery(`order/${data}`);
//       if (!response.data.error) {
//         yield put({
//           type: actions.GET_ORDER_DETAILS_SUCCESS,
//           payload: response.data.body.result,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });
// }

// export function* createOrder() {
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

export function* deleteCustomer() {
  yield takeLatest(
    actions.DELETE_CUSTOMER_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`user/delete/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_CUSTOMER_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Customer Deleted Successfully!");
        }

      } catch (e) {
        console.log(e);
      }
    }
  );
}

export function* getManagers() {
  yield takeLatest(actions.GET_MANAGERS_REQUEST, function* ({userName}) {
    try {
      let endpoint = "/admins"
      if (userName) {
        endpoint = `/admins?username=${userName}`
      }
      const response = yield getQuery(endpoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_MANAGERS_SUCCESS,
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

export function* deleteManager() {
  yield takeLatest(
    actions.DELETE_MANAGER_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`admin/delete/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_MANAGER_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Manager Deleted Successfully!");
        }

      } catch (e) {
        console.log(e);
      }
    }
  );
}

export default function* customerSaga() {
  yield all([
    fork(getCustomers),
    fork(deleteCustomer),
    fork(getManagers),
    fork(deleteManager),
  ]);
}
