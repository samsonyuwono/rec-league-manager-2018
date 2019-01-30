import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import TeamsList from "./teams/TeamsList";
import TeamShow from "../components/teams/TeamShow";
import TeamForm from "../components/teams/TeamForm";
import TeamEditForm from "../components/teams/TeamEditForm";
import TeamStandings from "../components/teams/TeamStandings";
import PlayersList from "./players/PlayersList";
import PlayerForm from "../components/players/PlayerForm";
import PlayerShow from "../components/players/PlayerShow";
import PlayerEditForm from "../components/players/PlayerEditForm";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";
import FlashMessagesList from "../components/FlashMessagesList";
import requireAuth from "../utils/requireAuth";
import "./../assets/App.scss";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/creators/authTypes";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <FlashMessagesList />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/teams/standings"
              component={requireAuth(TeamStandings)}
            />
            <Route exact path="/teams/new" component={requireAuth(TeamForm)} />
            <Route exact path="/teams/:id" component={requireAuth(TeamShow)} />
            <Route exact path="/teams" component={requireAuth(TeamsList)} />
            <Route
              exact
              path="/teams/:id/edit"
              component={requireAuth(TeamEditForm)}
            />
            <Route
              exact
              path="/players/"
              component={requireAuth(PlayersList)}
            />
            <Route
              exact
              path="/players/new"
              component={requireAuth(PlayerForm)}
            />
            <Route
              exact
              path="/players/:id"
              component={requireAuth(PlayerShow)}
            />
            <Route
              exact
              path="/players/:id/edit"
              Redirect
              to="/players"
              component={requireAuth(PlayerEditForm)}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
