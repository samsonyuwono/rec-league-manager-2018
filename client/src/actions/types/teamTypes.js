export const setTeams = teams => {
  return {
    type: "GET_TEAMS_SUCCESS",
    teams
  };
};

export const addTeam = team => {
  return {
    type: "CREATE_TEAM_SUCCESS",
    team
  };
};

export const updateTeam = teamFormData => {
  return {
    type: "UPDATE_TEAM_SUCCESS",
    teamFormData
  };
};

export const destroyTeam = teamId => {
  return {
    type: "DELETE_TEAM",
    teamId
  };
};

export const incrementWin = (wins, teamId) => {
  return {
    type: "INCREASE_WIN",
    wins,
    teamId
  };
};

export const incrementLoss = (losses, teamId) => {
  return {
    type: "INCREASE_LOSS",
    losses,
    teamId
  };
};
