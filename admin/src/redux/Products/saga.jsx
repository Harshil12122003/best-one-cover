import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getQuery, postQuery, putQuery, deleteQuery } from "utils/api";
import { Toast } from "utils/toast";
import { actions } from "./action";
import { actions as loaderAction } from "redux/Loader/action";

export function* getCategories() {
  yield takeLatest(actions.GET_CATEGORY_REQUEST, function* () {
    try {
      const response = yield getQuery(`/categories`);
      // console.log('response_GET_CATEGORY_REQUEST', response)
      if (!response.data.error) {
        yield put({
          type: actions.GET_CATEGORY_SUCCESS,
          payload: response?.data?.body?.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* editCategories() {
  yield takeLatest(actions.EDIT_CATEGORY_REQUEST, function* ({ data }) {
    console.log("dataEdit", data);
    try {
      const response = yield putQuery(`/category/${data.id}`, data);
      console.log("responseEditCategory", response);
      yield put({
        type: actions.EDIT_CATEGORY_SUCCESS,
        payload: response?.data?.body?.result,
      });
      Toast("success", "Category Updated Successfully!");
    } catch (error) {
      console.log("error", error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* deleteCategories() {
  yield takeLatest(actions.DELETE_CATEGORY_REQUEST, function* ({ data }) {
    // console.log('dataDeleteDeleteCategories', data)
    try {
      const response = yield deleteQuery(`/category/${data}`);
      // console.log('responseDeleteCategories', response)
      yield put({
        type: actions.DELETE_CATEGORY_SUCCESS,
        payload: response?.data?.body.result,
      });
      Toast("success", "Category Deleted Successfully!");
    } catch (error) {
      console.log("error", error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* getProducts() {
  yield takeLatest(actions.GET_PRODUCTS_REQUEST, function* ({ data }) {
    try {
      let endpoint = "";
      if (data?.page) {
        endpoint = `products?page=${data.page}&bId=${data.bId}&mId=${data.mId}`;
        delete data.page;
      } else if (data?.bId && data?.mId) {
        endpoint = `products?bId=${data.bId}&mId=${data.mId}`;
      } else if (data?.keyword) {
        endpoint = `products?keyword=${data?.keyword}`;
      } else {
        endpoint = "products";
      }

      const response = yield postQuery(endpoint, data);
      if (!response.data.error) {
        yield put({
          type: actions.GET_PRODUCTS_SUCCESS,
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

export function* getProductDetails() {
  yield takeLatest(actions.GET_PRODUCT_DETAILS_REQUEST, function* ({ data }) {
    try {
      const response = yield getQuery(`product/${data}`);
      if (!response.data.error) {
        yield put({
          type: actions.GET_PRODUCT_DETAILS_SUCCESS,
          payload: response.data.body.result,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function* createProduct() {
  yield takeLatest(
    actions.CREATE_PRODUCT_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield postQuery(`product/new`, data);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_PRODUCT_SUCCESS,
            payload: response.data.body.result,
          });

          Toast("success", "Product Created Successfully!");
          navigate("/products");
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

export function* updateProduct() {
  yield takeLatest(
    actions.UPDATE_PRODUCT_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield putQuery(`product/${data.id}`, data.myForm);

        if (!response.data.error) {
          yield put({
            type: actions.UPDATE_PRODUCT_SUCCESS,
            payload: response.data.body.result,
          });
          yield put({
            type: loaderAction.CLOSE_LOADER,
            payload: false,
          });
          Toast("success", "Product Updated Successfully!");
          navigate("/products");
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

export function* createBrand() {
  yield takeLatest(
    actions.CREATE_BRAND_REQUEST,
    function* ({ data, navigate }) {
      try {
        delete data.category;
        // data.model = [];
        const response = yield postQuery(`brand/new`, data);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_BRAND_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Brand Added Successfully!");
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
      }
    }
  );
}

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

export function* editBrand() {
  yield takeLatest(actions.EDIT_BRAND_REQUEST, function* ({ data }) {
    try {
      const response = yield putQuery(`/brand/${data.id}`, data);

      yield put({
        type: actions.EDIT_BRAND_SUCCESS,
        payload: response?.data?.body?.result,
      });
      Toast("success", "Brand Updated Successfully!");
    } catch (error) {
      console.log("error", error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* deleteBrand() {
  yield takeLatest(actions.DELETE_BRAND_REQUEST, function* ({ data }) {
    // console.log('dataDeleteDeleteCategories', data)
    try {
      const response = yield deleteQuery(`/brand/${data}`);
      // console.log('responseDeleteCategories', response)
      yield put({
        type: actions.DELETE_BRAND_SUCCESS,
        payload: response?.data?.body.result,
      });
      Toast("success", "Brand Deleted Successfully!");
    } catch (error) {
      console.log("error", error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* createModel() {
  yield takeLatest(
    actions.CREATE_MODEL_REQUEST,
    function* ({ data, navigate }) {
      try {
        console.log("---------------", data);
        delete data.category;
        const dataObj = {
          brand: data.modelBrand,
          model: data.model,
        };
        // data.model = [];
        const response = yield postQuery(`brand/model/new`, dataObj);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_MODEL_SUCCESS,
            payload: response.data.body.result,
          });

          Toast("success", "Model Added Successfully!");
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
      }
    }
  );
}

export function* editModel() {
  yield takeLatest(actions.EDIT_MODEL_REQUEST, function* ({ data }) {
    try {
      const response = yield putQuery(
        `/brand/model?brandId=${data?.brandId}&modelId=${data?.modelId}`,
        { name: data?.name }
      );

      yield put({
        type: actions.EDIT_MODEL_SUCCESS,
        payload: response?.data?.body?.result,
      });
      Toast("success", "Model Updated Successfully!");
    } catch (error) {
      console.log("error", error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* deleteModel() {
  yield takeLatest(actions.DELETE_MODEL_REQUEST, function* ({ data }) {
    // console.log('dataDeleteDeleteCategories', data)
    try {
      const response = yield deleteQuery(
        `/brand/model?brandId=${data?.brandId}&modelId=${data?.modelId}`
      );
      // console.log('responseDeleteCategories', response)
      yield put({
        type: actions.DELETE_MODEL_SUCCESS,
        payload: response?.data?.body.result,
      });
      Toast("success", "Model Deleted Successfully!");
    } catch (error) {
      console.log("error", error);
      Toast("error", error.response.data.body.message);
    }
  });
}

export function* createCategory() {
  yield takeLatest(
    actions.CREATE_CATEGORY_REQUEST,
    function* ({ data, navigate }) {
      try {
        const newData = {
          name: data.category,
        };
        const response = yield postQuery(`category/new`, newData);

        if (!response.data.error) {
          yield put({
            type: actions.CREATE_CATEGORY_SUCCESS,
            payload: response.data.body.result,
          });

          Toast("success", "Category Added Successfully!");
        }
      } catch (e) {
        console.log(e);
        Toast("error", e.response.data.body.message);
      }
    }
  );
}

export function* deleteProduct() {
  yield takeLatest(
    actions.DELETE_PRODUCT_REQUEST,
    function* ({ data, navigate }) {
      try {
        const response = yield deleteQuery(`product/${data}`);

        if (!response.data.error) {
          yield put({
            type: actions.DELETE_PRODUCT_SUCCESS,
            payload: response.data.body.result,
          });
          Toast("success", "Product Deleted Successfully!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
}

export default function* productsSaga() {
  yield all([
    fork(createProduct),
    fork(getProducts),
    fork(updateProduct),
    fork(deleteProduct),
    fork(getProductDetails),
    fork(createCategory),
    fork(getCategories),
    fork(editCategories),
    fork(deleteCategories),
    fork(createBrand),
    fork(getBrands),
    fork(editBrand),
    fork(deleteBrand),
    fork(createModel),
    fork(editModel),
    fork(deleteModel),
  ]);
}
