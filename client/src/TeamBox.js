import React, { Component } from "react";
import TeamList from "./TeamList";
import TeamForm from "./TeamForm";
import { Link } from "react-router-dom";
import DATA from "./data";
import axios from "axios";

class TeamBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
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

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
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
              <TeamList data={DATA} />
            </div>
          </div>
        </div>
        <div className="form">
          <TeamForm />
        </div>
      </div>
    );
  }
}

export default TeamBox;
