import React, { Component } from "react";
import "whatwg-fetch";
import TeamList from "./TeamList";
import TeamForm from "./TeamForm";
import { Link } from "react-router-dom";
import axios from "axios";

class TeamBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      name: "",
      wins: 0,
      losses: 0,
      logo_url: ""
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadTeamsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get("/api/team")
      .then(res => {
        this.setState({ teams: res.data });
        console.log(this.state.teams);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  loadTeamsFromServer = () => {
    fetch("/api/teams/")
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  };
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Rec League &nbsp;
              {localStorage.getItem("jwtToken") && (
                <button className="btn btn-primary" onClick={this.logout}>
                  Logout
                </button>
              )}
            </h3>
          </div>
          <div className="panel-body">
            <div className="teams">
              <h2>Teams:</h2>
              <TeamList data={this.state.data} />
            </div>
          </div>
        </div>
        <div className="form">
          <TeamForm name={this.state.team} wins={this.state.wins} />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default TeamBox;
