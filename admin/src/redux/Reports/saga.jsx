import { all, fork, put, takeLatest } from "redux-saga/effects";
import { deleteQuery, getQuery, postQuery, putQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
// import loaderAction from "redux/Loader/action";

export function* getSales() {
  yield takeLatest(actions.GET_SALES_REQUEST, function* ({ data }) {
    try {
      let endPoint = "/sales";
      if (data?.username) {
        endPoint = `/sales?username=${data?.username}`;
      }
      if (data?.startDate && data?.endDate) {
        endPoint = `/sales?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      const response = yield getQuery(endPoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_SALES_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getCounters() {
  yield takeLatest(actions.GET_COUNTER_REQUEST, function* ({ data }) {
    try {
      // console.log(data);
      let endPoint = "/counters";
      if (data && data?.username) {
        endPoint = `/counters?username=${data?.username}`;
      }
      if (data && data?.startDate && data?.endDate) {
        endPoint = `/counters?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      if (data && data?.shopId !== "" || data?.shopId && data) {
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
          type: actions.GET_COUNTER_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getRevenue() {
  yield takeLatest(actions.GET_REVENUE_REQUEST, function* ({ data }) {
    try {
      // console.log(data);
      let endPoint = "/counters";
      let endPointSales = "/sales";
      if (data && data?.username) {
        endPoint = `/counters?username=${data?.username}`;
        endPointSales = `/sales?username=${data?.username}`;
      }
      if (data && data?.startDate && data?.endDate) {
        endPoint = `/counters?startDate=${data?.startDate}&endDate=${data?.endDate}`;
        endPointSales = `/sales?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      if (data && data?.shopId !== "" || data?.shopId && data) {
        endPoint = `/counters?shopId=${data?.shopId}`;
      }

      if (data && data?.startDate && data?.endDate && data?.shopId !== "") {
        console.log(data);
        endPoint = `/counters?startDate=${data?.startDate}&endDate=${data?.endDate}&shopId=${data?.shopId}`;
      }

      const responseRevenue = yield getQuery(endPoint);
      const responseSales = yield getQuery(endPointSales);
      if (!responseRevenue.data.error) {
        yield put({
          type: actions.GET_REVENUE_SUCCESS,
          payload: { revenueOffline: responseRevenue.data.body.result, revenueOnline: responseSales.data.body.result },
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* getProfit() {
  yield takeLatest(actions.GET_PROFIT_REQUEST, function* ({ data }) {
    try {
      // console.log(data);
      let endPoint = `/profit-report`;
      // let endPointSales = "/sales";
      // if (data && data?.username) {
      //   endPoint = `/counters?username=${data?.username}`;
      //   endPointSales = `/sales?username=${data?.username}`;
      // }
      if (data && data?.startDate && data?.endDate) {
        endPoint = `/profit-report?startDate=${data?.startDate}&endDate=${data?.endDate}`;
        // endPointSales = `/sales?startDate=${data?.startDate}&endDate=${data?.endDate}`;
      }

      // if (data && data?.shopId !== "" || data?.shopId && data) {
      //   endPoint = `/counters?shopId=${data?.shopId}`;
      // }

      if (data && data?.startDate && data?.endDate && data?.shopId) {
        console.log(data);
        endPoint = `/profit-report?startDate=${data?.startDate}&endDate=${data?.endDate}&shopId=${data?.shopId}`;
      }

      // if (data && data?.shopId !== "" || data?.shopId && data) {
      //   endPoint = `/profit-report?shopId=${data?.shopId}`;
      // }

      const response = yield getQuery(endPoint);
      if (!response.data.error) {
        yield put({
          type: actions.GET_PROFIT_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}



export default function* reportsSaga() {
  yield all([
    fork(getSales),
    fork(getCounters),
    fork(getRevenue),
    fork(getProfit),
  ]);
}
