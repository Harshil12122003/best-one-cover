export const loaderAction = {
  START_LOADER: "START_LOADER",
  CLOSE_LOADER: "CLOSE_LOADER",
  START_LOADER_SUCCESS: "START_LOADER_SUCCESS",
  CLOSE_LOADER_SUCCESS: "CLOSE_LOADER_SUCCESS",

  startLoader: () => {
    return {
      type: loaderAction.START_LOADER,
    };
  },
  closeLoader: () => {
    return {
      type: loaderAction.CLOSE_LOADER,
    };
  },
};
