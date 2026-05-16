import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  reviews: [],
  review: null,
  myReviews: [],
  error: false,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
      };

    case actions.GET_MY_REVIEWS_SUCCESS:
      return {
        ...state,
        myReviews: action.payload,
      };
    case actions.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        review: action.payload,
        myReviews: [action.payload, ...state.myReviews],
        // reviews: [...action.payload, ...state.reviews],
      };
    case actions.UPDATE_REVIEW_SUCCESS:
      const data = state.myReviews.map((review)=>{
        if(review?._id === action?.payload?._id){
          review.rating = action?.payload?.rating; 
          review.review = action?.payload?.review; 
        }
        return review;
      })
      return {
        ...state,
        review: action.payload,
        myReviews: data,
        // reviews: [...action.payload, ...state.reviews],
      };
    case actions.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        review: action.payload,
        myReviews: state.myReviews.filter((review)=>{
          return action.payload?._id !== review?._id
        }),
        // reviews: [...action.payload, ...state.reviews],
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

export default reviewReducer;