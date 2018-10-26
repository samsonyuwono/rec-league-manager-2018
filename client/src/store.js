import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import teams from "./reducers/teams";
import players from "./reducers/players";
import teamFormData from "./reducers/teamFormData";
import playerFormData from "./reducers/playerFormData";

const reducers = combineReducers({
  teams,
  teamFormData,
  players,
  playerFormData
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);
