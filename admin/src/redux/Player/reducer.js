import setToken from "utils/setToken";
import { actions } from "./action";

const initialState = {
  player: null,
  players: [],
  club: [],
  allPlayers: [],
  error: false,
};

const playerReducer = (state = initialState, action) => {
  // const token = localStorage.getItem("TOKEN");
  // if (token) {
  //   setToken(token);
  // }
  switch (action.type) {
    case actions.GET_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.payload,
      };
    case actions.CREATE_PLAYERS_SUCCESS:
      return {
        ...state,
        players: [...state.players, ...action.payload],
      };
    case actions.UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        player: action.payload,
      };

    case actions.GET_CLUB_SUCCESS:
      return {
        ...state,
        club: action.payload,
      };
    case actions.GET_ALL_PLAYERS_SUCCESS:
      return {
        ...state,
        allPlayers: [...action.payload],
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

export default playerReducer;
