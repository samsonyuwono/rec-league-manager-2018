import { resetTeamForm } from "./teamForm";
// let API_URL = process.env.REACT_APP_API_URL;

let API_URL = "https://rec-league-manager.herokuapp.com/api";

const setTeams = teams => {
  return {
    type: "GET_TEAMS_SUCCESS",
    teams
  };
};

const addTeam = team => {
  return {
    type: "CREATE_TEAM_SUCCESS",
    team
  };
};

const updateTeam = teamFormData => {
  return {
    type: "UPDATE_TEAM_SUCCESS",
    teamFormData
  };
};

const destroyTeam = teamId => {
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

export const getTeams = () => {
  return dispatch => {
    return fetch(`${API_URL}/teams`)
      .then(res => res.json())
      .then(teams => dispatch(setTeams(teams)))
      .catch(error => console.log(error));
  };
};

export const createTeam = (team, history) => {
  return dispatch => {
    return fetch(`${API_URL}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(team)
    })
      .then(response => response.json())
      .then(team => {
        dispatch(addTeam(team));
        dispatch(resetTeamForm());
        history.push("/teams");
      })
      .catch(error => console.log(error));
  };
};

export const editTeam = (teamId, team) => {
  return dispatch => {
    return fetch(`${API_URL}/teams/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(team)
    })
      .then(response => response.json())
      .then(team => {
        dispatch(updateTeam(team));
      })
      .catch(error => console.log(error));
  };
};

export const deleteTeam = teamId => {
  return dispatch => {
    return fetch(`${API_URL}/teams/${teamId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(team => {
        dispatch(destroyTeam(teamId));
      })
      .catch(error => console.log(error));
  };
};

export const increaseWin = (wins, teamId) => {
  const addWin = Object.assign({}, teamId, { wins: wins + 1 });
  return dispatch => {
    return fetch(`${API_URL}/teams/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addWin)
    })
      .then(response => response.json())
      .then(team => {
        dispatch(incrementWin(wins, teamId));
      })
      .catch(error => console.log(error));
  };
};

export const increaseLoss = (losses, teamId) => {
  const addLoss = Object.assign({}, teamId, { losses: losses + 1 });

  return dispatch => {
    return fetch(`${API_URL}/teams/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addLoss)
    })
      .then(response => response.json())
      .then(team => {
        dispatch(incrementLoss(losses, teamId));
      })
      .catch(error => console.log(error));
  };
};
