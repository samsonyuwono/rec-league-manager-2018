import { resetPlayerForm } from "./playerForm";

let API_URL = "https://rec-league-manager.herokuapp.com/api";

const setPlayers = players => {
  return {
    type: "FETCH_PLAYERS",
    players
  };
};

const addPlayer = player => {
  return {
    type: "CREATE_PLAYER_SUCCESS",
    player
  };
};

const updatePlayer = playerFormData => {
  return {
    type: "UPDATE_PLAYER_SUCCESS",
    playerFormData
  };
};

const destroyPlayer = playerId => {
  return {
    type: "DELETE_PLAYER",
    playerId
  };
};

const incrementLike = (likes, playerId) => {
  return {
    type: "INCREASE_LIKE",
    likes,
    playerId
  };
};

export const fetchPlayers = () => {
  return dispatch => {
    return fetch(`${API_URL}/players`)
      .then(response => response.json())
      .then(players => dispatch(setPlayers(players)))
      .catch(error => console.log(error));
  };
};

export const createPlayer = player => {
  let teamId = player.team_id;
  return dispatch => {
    return fetch(`${API_URL}/teams/${teamId}/player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(player)
    })
      .then(response => response.json())
      .then(player => {
        dispatch(addPlayer(player));
        dispatch(resetPlayerForm());
      })
      .catch(error => console.log(error));
  };
};

export const editPlayer = (playerId, player) => {
  return dispatch => {
    return fetch(`${API_URL}/players/${playerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(player)
    })
      .then(response => response.json())
      .then(player => {
        dispatch(updatePlayer(player));
      })
      .catch(error => console.log(error));
  };
};

export const deletePlayer = playerId => {
  return dispatch => {
    return fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(player => {
        dispatch(destroyPlayer(playerId));
      })
      .catch(error => console.log(error));
  };
};

export const increaseLike = (likes, playerId) => {
  const addLike = Object.assign({}, playerId, { likes: likes + 1 });
  return dispatch => {
    return fetch(`${API_URL}/players/${playerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addLike)
    })
      .then(response => response.json())
      .then(team => {
        dispatch(incrementLike(likes, playerId));
      })
      .catch(error => console.log(error));
  };
};
