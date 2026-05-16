export const actions = {
  
  CREATE_MODEL_REQUEST: "CREATE_MODEL_REQUEST",
  CREATE_MODEL_SUCCESS: "CREATE_MODEL_SUCCESS",
  
  EDIT_MODEL_REQUEST: "EDIT_MODEL_REQUEST",
  EDIT_MODEL_SUCCESS: "EDIT_MODEL_SUCCESS",
  
  DELETE_MODEL_REQUEST: "DELETE_MODEL_REQUEST",
  DELETE_MODEL_SUCCESS: "DELETE_MODEL_SUCCESS",
  
  CREATE_BRAND_REQUEST: "CREATE_BRAND_REQUEST",
  CREATE_BRAND_SUCCESS: "CREATE_BRAND_SUCCESS",
  
  GET_BRANDS_REQUEST: "GET_BRANDS_REQUEST",
  GET_BRANDS_SUCCESS: "GET_BRANDS_SUCCESS",

  EDIT_BRAND_REQUEST: "EDIT_BRAND_REQUEST",
  EDIT_BRAND_SUCCESS: "EDIT_BRAND_SUCCESS",

  DELETE_BRAND_REQUEST: "DELETE_BRAND_REQUEST",
  DELETE_BRAND_SUCCESS: "DELETE_BRAND_SUCCESS",
  
  CREATE_CATEGORY_REQUEST: "CREATE_CATEGORY_REQUEST",
  CREATE_CATEGORY_SUCCESS: "CREATE_CATEGORY_SUCCESS",

  GET_CATEGORY_REQUEST: "GET_CATEGORY_REQUEST",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",

  EDIT_CATEGORY_REQUEST: "EDIT_CATEGORY_REQUEST",
  EDIT_CATEGORY_SUCCESS: "EDIT_CATEGORY_SUCCESS",

  DELETE_CATEGORY_REQUEST: "DELETE_CATEGORY_REQUEST",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",

  CREATE_PRODUCT_REQUEST: "CREATE_PRODUCT_REQUEST",
  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",

  GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",

  UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",

  DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",

  GET_PRODUCT_DETAILS_REQUEST: "GET_PRODUCT_DETAILS_REQUEST",
  GET_PRODUCT_DETAILS_SUCCESS: "GET_PRODUCT_DETAILS_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getProductDetails: (data) => {
    return {
      type: actions.GET_PRODUCT_DETAILS_REQUEST,
      data,
    };
  },

  createProduct: (data, navigate) => {
    return {
      type: actions.CREATE_PRODUCT_REQUEST,
      data,
      navigate,
    };
  },

  getProducts: (data) => {
    return {
      type: actions.GET_PRODUCTS_REQUEST,
      data,
    };
  },

  updateProduct: (data, navigate) => {
    return {
      type: actions.UPDATE_PRODUCT_REQUEST,
      data,
      navigate,
    };
  },
  deleteProduct: (data) => {
    return {
      type: actions.DELETE_PRODUCT_REQUEST,
      data,
    };
  },

  createBrand: (data) => {
    return {
      type: actions.CREATE_BRAND_REQUEST,
      data,
    };
  },

  getBrands: () => {
    return {
      type: actions.GET_BRANDS_REQUEST,
    };
  },

  editBrand: (data) => {
    return {
      type: actions.EDIT_BRAND_REQUEST,
      data,
    };
  },

  deleteBrand: (data) => {
    return {
      type: actions.DELETE_BRAND_REQUEST,
      data,
    };
  },

  createModel: (data) => {
    return {
      type: actions.CREATE_MODEL_REQUEST,
      data,
    };
  },

  editModel: (data) => {
    return {
      type: actions.EDIT_MODEL_REQUEST,
      data,
    };
  },

  deleteModel: (data) => {
    return {
      type: actions.DELETE_MODEL_REQUEST,
      data,
    };
  },

  createCategory: (data) => {
    return {
      type: actions.CREATE_CATEGORY_REQUEST,
      data,
    };
  },
  getCategories: () => {
    return {
      type: actions.GET_CATEGORY_REQUEST,
    };
  },

  editCategories: (data) => {
    return {
      type: actions.EDIT_CATEGORY_REQUEST,
      data,
    };
  },

  deleteCategories: (id) => {
    return {
      type: actions.DELETE_CATEGORY_REQUEST,
      data: id,
    };
  },
};
