export const actions = {
  CREATE_REVIEW_REQUEST: "CREATE_REVIEW_REQUEST",
  CREATE_REVIEW_SUCCESS: "CREATE_REVIEW_SUCCESS",

  UPDATE_REVIEW_REQUEST: "UPDATE_REVIEW_REQUEST",
  UPDATE_REVIEW_SUCCESS: "UPDATE_REVIEW_SUCCESS",

  DELETE_REVIEW_REQUEST: "DELETE_REVIEW_REQUEST",
  DELETE_REVIEW_SUCCESS: "DELETE_REVIEW_SUCCESS",

  GET_REVIEWS_REQUEST: "GET_REVIEWS_REQUEST",
  GET_REVIEWS_SUCCESS: "GET_REVIEWS_SUCCESS",

  GET_MY_REVIEWS_REQUEST: "GET_MY_REVIEWS_REQUEST",
  GET_MY_REVIEWS_SUCCESS: "GET_MY_REVIEWS_SUCCESS",

  GET_REVIEW_REQUEST: "GET_REVIEW_REQUEST",
  GET_REVIEW_SUCCESS: "GET_REVIEW_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getReviews: (data) => {
    return {
      type: actions.GET_REVIEWS_REQUEST,
      data
    };
  },

  createReview: (data) => {
    return {
      type: actions.CREATE_REVIEW_REQUEST,
      data,
    };
  },

  getMyReviews: () => {
    return {
      type: actions.GET_MY_REVIEWS_REQUEST,
    };
  },

  updateReview: (data) => {
    return {
      type: actions.UPDATE_REVIEW_REQUEST,
      data,
    };
  },

  deleteReview: (data) => {
    return {
      type: actions.DELETE_REVIEW_REQUEST,
      data,
    };
  },

  // getOrderDetails: (data) => {
  //   return {
  //     type: actions.GET_REVIEW_SUCCESS,
  //     data,
  //   };
  // },
};
