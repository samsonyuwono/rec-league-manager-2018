import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import teams from "./reducers/teams";
import players from "./reducers/players";
import teamFormData from "./reducers/teamFormData";
import playerFormData from "./reducers/playerFormData";
import auth from "./reducers/auth";
import errorReducers from "./reducers/errorReducers";
import flashMessages from "./reducers/flashMessages";

const reducers = combineReducers({
  teams,
  teamFormData,
  players,
  playerFormData,
  auth,
  errorReducers,
  flashMessages
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);
