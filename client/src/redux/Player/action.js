export const actions = {
  GET_PLAYERS_REQUEST: "GET_PLAYERS_REQUEST",
  GET_PLAYERS_SUCCESS: "GET_PLAYERS_SUCCESS",

  CREATE_PLAYERS_REQUEST: "CREATE_PLAYERS_REQUEST",
  CREATE_PLAYERS_SUCCESS: "CREATE_PLAYERS_SUCCESS",

  UPDATE_PLAYER_REQUEST: "UPDATE_PLAYER_REQUEST",
  UPDATE_PLAYER_SUCCESS: "UPDATE_PLAYER_SUCCESS",

  GET_ALL_PLAYERS_REQUEST: "GET_ALL_PLAYERS_REQUEST",
  GET_ALL_PLAYERS_SUCCESS: "GET_ALL_PLAYERS_SUCCESS",

  GET_CLUB_REQUEST: "GET_CLUB_REQUEST",
  GET_CLUB_SUCCESS: "GET_CLUB_SUCCESS",

  CATCH_ERROR: "CATCH_ERROR",

  getPlayers: (data) => {
    return {
      type: actions.GET_PLAYERS_REQUEST,
      data,
    };
  },

  createPlayers: (data, navigate) => {
    return {
      type: actions.CREATE_PLAYERS_REQUEST,
      data,
      navigate,
    };
  },

  updatePlayer: (data) => {
    return {
      type: actions.UPDATE_PLAYER_REQUEST,
      data,
    };
  },

  getClub: () => {
    return {
      type: actions.GET_CLUB_REQUEST,
    };
  },

  getAllPlayers: (data) => {
    return {
      type: actions.GET_ALL_PLAYERS_REQUEST,
      data,
    };
  },
};