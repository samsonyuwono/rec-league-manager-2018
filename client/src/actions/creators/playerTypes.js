export const setPlayers = players => {
  return {
    type: "FETCH_PLAYERS",
    players
  };
};

export const addPlayer = player => {
  return {
    type: "CREATE_PLAYER_SUCCESS",
    player
  };
};

export const updatePlayer = playerFormData => {
  return {
    type: "UPDATE_PLAYER_SUCCESS",
    playerFormData
  };
};

export const destroyPlayer = playerId => {
  return {
    type: "DELETE_PLAYER",
    playerId
  };
};

export const incrementLike = (likes, playerId) => {
  return {
    type: "INCREASE_LIKE",
    likes,
    playerId
  };
};
