import { resetPlayerForm } from "./playerForm";

// const API_URL = process.env.REACT_APP_API_URL;

let API_URL = "http://localhost:3001/api";

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
    debugger;
  };
};

export const createPlayer = (player, teamID, history) => {
  return dispatch => {
    return fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ player: player })
    })
      .then(response => response.json())
      .then(player => {
        dispatch(addPlayer(player));
        dispatch(resetPlayerForm());
        history.push("/players");
      })
      .catch(error => console.log(error));
  };
};

export const editPlayer = (playerId, player) => {
  return dispatch => {
    return fetch(`${API_URL}/players/${playerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ player: player })
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
      method: "PATCH",
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
