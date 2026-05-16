export const actions = {
  GET_BRANDS_REQUEST: "GET_BRANDS_REQUEST",
  GET_BRANDS_SUCCESS: "GET_BRANDS_SUCCESS",

  GET_CATEGORY_REQUEST: "GET_CATEGORY_REQUEST",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",

  GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",

  GET_PRODUCT_DETAILS_REQUEST: "GET_PRODUCT_DETAILS_REQUEST",
  GET_PRODUCT_DETAILS_SUCCESS: "GET_PRODUCT_DETAILS_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getBrands: () => {
    return {
      type: actions.GET_BRANDS_REQUEST,
    };
  },
  getCategories: () => {
    return {
      type: actions.GET_CATEGORY_REQUEST,
    };
  },
  getProducts: (data) => {
    return {
      type: actions.GET_PRODUCTS_REQUEST,
      data,
    };
  },
  getProductDetails: (data) => {
    return {
      type: actions.GET_PRODUCT_DETAILS_REQUEST,
      data,
    };
  },
};
