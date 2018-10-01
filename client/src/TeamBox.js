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
      logo_url: "",
      updateId: null
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadTeamsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadTeamsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  handleOnChange = e => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  onUpdateTeam = id => {
    const oldTeam = this.state.data.find(t => t._id === id);
    if (!oldTeam) return;
    this.setState({
      name: oldTeam.name,
      wins: oldTeam.wins,
      losses: oldTeam.losses,
      logo_url: oldTeam.logo_url,
      updateId: id
    });
  };

  onDeleteTeam = id => {
    const i = this.state.data.findIndex(t => t._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1)
    ];
    this.setState({ data });
    fetch(`api/teams/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
      });
  };

  submitTeam = e => {
    e.preventDefault();
    const { name, wins, losses, logo_url, updateId } = this.state;
    debugger;
    if (!name || !wins || !losses || !logo_url) return;
    if (updateId) {
      this.submitUpdatedTeam();
    } else {
      this.submitNewTeam();
    }
  };

  submitNewTeam = e => {
    e.preventDefault();
    const { name, wins, losses, logo_url } = this.state;
    const data = [
      ...this.state.data,
      { name, wins, losses, logo_url, _id: Date.now().toString() }
    ];
    this.setState({ data });
    fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, wins, losses, logo_url })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success)
          this.setState({ error: res.error.message || res.error });
        else
          this.setState({
            name: "",
            wins: 0,
            losses: 0,
            logo_url: "",
            error: null
          });
      });
  };

  submitUpdatedTeam = () => {
    const { name, wins, losses, logo_url, updateId } = this.state;
    fetch(`/api/teams/${updateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, wins, losses, logo_url })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success)
          this.setState({ error: res.error.message || res.error });
        else
          this.setState({
            name: "",
            wins: 0,
            losses: 0,
            logo_url: "",
            updateId: null
          });
      });
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
            <h3 className="panel-title">Rec League &nbsp;</h3>
          </div>
          <div className="panel-body">
            <div className="teams">
              <h2>Teams:</h2>
              <TeamList
                data={this.state.data}
                handleUpdateTeam={this.state.onUpdateTeam}
                handleDeleteTeam={this.state.onDeleteTeam}
              />
            </div>
          </div>
        </div>
        <div className="form">
          <TeamForm
            name={this.state.name}
            wins={this.state.wins}
            losses={this.state.losses}
            logo_url={this.state.logo_url}
            handleOnChange={this.handleOnChange}
            handleSubmit={this.submitTeam}
          />
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default TeamBox;
