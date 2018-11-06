export default (state = [], action) => {
  switch (action.type) {
    case "GET_TEAMS_SUCCESS":
      return action.teams;

    case "CREATE_TEAM_SUCCESS":
      debugger;
      return state.concat(action.team);

    case "UPDATE_TEAM_SUCCESS":
      const newTeamState = state.map(team => {
        if (team._id === action.teamId) {
          return Object.assign({}, team, { team: team });
        } else {
          return team;
        }
      });
      return newTeamState;

    case "DELETE_TEAM":
      state.splice(action.playerId, 1);
      return state;

    case "INCREASE_WIN":
      const newWinState = state.map(team => {
        if (team._id === action.teamId) {
          return Object.assign({}, team, { wins: action.wins + 1 });
        } else {
          return team;
        }
      });
      return newWinState;

    case "INCREASE_LOSS":
      const newLossState = state.map(team => {
        if (team._id === action.teamId) {
          return Object.assign({}, team, { losses: action.losses + 1 });
        } else {
          return team;
        }
      });
      return newLossState;

    default:
      return state;
  }
};
