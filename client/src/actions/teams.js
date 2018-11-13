import { resetTeamForm } from "./teamForm";
// let API_URL = process.env.REACT_APP_API_URL;

let API_URL = "http://localhost:3001/api";

// if (process.env.NODE_ENV === "production") {
//   process.env.REACT_PRODUCTION_API_URL;
// }

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

export const createTeam = (team, radix) => {
  let newTeam = {};
  newTeam.name = team.name;
  newTeam.wins = parseInt(team.wins, radix);
  newTeam.losses = parseInt(team.losses, radix);
  newTeam.logo_url = team.logo_url;
  debugger;
  return dispatch => {
    //look here. figure out what's being passed
    return fetch(`${API_URL}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTeam)
    })
      .then(response => {
        console.log("response.json is; ", JSON.parse(response));
        response.json();
      })
      .then(newTeam => {
        dispatch(addTeam(newTeam));
        dispatch(resetTeamForm());
      })
      .catch(error => console.log(error));
  };
};

export const editTeam = (teamId, team) => {
  return dispatch => {
    return fetch(`${API_URL}/teams/${teamId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ team: team })
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
      method: "PATCH",
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
