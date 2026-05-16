import { actions } from "./action";

const initialState = {
  networkProgressDialog: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.START_LOADER_SUCCESS:
      return {
        ...state,
        networkProgressDialog: true,
      };
    case actions.CLOSE_LOADER_SUCCESS:
      return {
        ...state,
        networkProgressDialog: false,
      };

    default:
      return state;
  }
};

export default loaderReducer;
