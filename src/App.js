import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
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
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Rec League &nbsp;
              {localStorage.getItem("jwtToken") && (
                <button class="btn btn-primary" onClick={this.logout}>
                  Logout
                </button>
              )}
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {this.state.teams.map(team => (
                  <tr>
                    <td>
                      <Link to={`/show/${team._id}`}>{team.logo_url}</Link>
                    </td>
                    <td>{team.name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
