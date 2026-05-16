import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  brands: [],
  category: null,
  categories: [],
  products: [],
  product: {},
  brand: null,
  model: null,
  error: false,
};

const productReducer = (state = initialState, action) => {
  // console.log('state', state.categories)
  const token = localStorage.getItem("ADMIN_TOKEN");
  if (token) {
    setToken(token);
  }
  switch (action.type) {
    case actions.GET_CATEGORY_SUCCESS:
      // console.log('action.GET_CATEGORY_SUCCESS', action.payload)
      return {
        ...state,
        categories: action.payload,
      };

    case actions.EDIT_CATEGORY_SUCCESS:
      console.log("actionEDIT_CATEGORY_SUCCESS", action.payload);
      return {
        ...state,
        category: action.payload,
      };

    case actions.DELETE_CATEGORY_SUCCESS:
      // console.log("actionDELETE_CATEGORY_SUCCESS", action.payload);
      return {
        ...state,
        category: action.payload,
        categories: state.categories.filter((category) => {
          return category?._id !== action.payload?._id;
        }),
      };

    case actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    case actions.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };
    case actions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        // product: action.payload,
        products: [action.payload, ...state.products],
      };

    case actions.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };

    case actions.CREATE_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        brands: [...state.brands, action.payload],
      };

    case actions.GET_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
      };

    case actions.EDIT_BRAND_SUCCESS:
      console.log("brand._EDIT_BRAND_SUCCESS", action.payload);
      return {
        ...state,
        brand: action.payload,
        // brands: action.payload,

        // brands: [...state.brands, action.payload],
      };

    case actions.DELETE_BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        brands: state.brands.filter((brand) => {
          return brand?._id !== action.payload?._id;
        }),
      };

    case actions.CREATE_MODEL_SUCCESS:
      let data = state.brands.map((brand) => {
        if (brand?._id === action?.payload?._id) {
          brand.models = action?.payload?.models;
        }
        return brand;
      });

      return {
        ...state,
        brand: action.payload,
        brands: data,
      };

    case actions.EDIT_MODEL_SUCCESS:
      let data1 = state.brands.map((brand) => {
        if (brand?._id === action?.payload?._id) {
          brand.models = action?.payload?.models;
        }
        return brand;
      });
      return {
        ...state,
        brand: action.payload,
        brands: data1,
      };

    case actions.DELETE_MODEL_SUCCESS:
      let filterData = state.brands.map((brand) => {
        if (brand?._id === action?.payload?._id) {
          let models = action?.payload?.models.map((model)=>{
            return model.active === true && model;
          })
          brand.models = models
        }
        return brand;
      });

      return {
        ...state,
        brand: action.payload,
        brands: filterData,
      };

    case actions.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        categories: [...state.categories, action.payload],
      };

    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        products: state.products.filter((product) => {
          return product?._id !== action.payload?._id;
        }),
      };

    case actions.CATCH_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default productReducer;
