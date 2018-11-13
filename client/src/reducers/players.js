export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PLAYERS":
      return action.players;

    case "CREATE_PLAYER_SUCCESS":
      debugger;
      return state.concat(action.player);

    case "UPDATE_PLAYER_SUCCESS":
      const newPlayerState = state.map(player => {
        if (player._id === action.playerId) {
          return Object.assign({}, player, { player: player });
        } else {
          return player;
        }
      });
      return newPlayerState;

    case "DELETE_PLAYER":
      state.splice(action.playerId, 1);
      return state;

    case "INCREASE_LIKE":
      const newLikeState = state.map(player => {
        if (player._id === action.playerId) {
          return Object.assign({}, player, { likes: action.likes + 1 });
        } else {
          return player;
        }
      });
      return newLikeState;

    default:
      return state;
  }
};
