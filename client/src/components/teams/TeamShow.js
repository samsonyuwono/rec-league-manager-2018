import React, { Component } from "react";
import PlayerForm from "../players/PlayerForm";
import { connect } from "react-redux";
import { getTeams, deleteTeam } from "../../actions/teams";
import { fetchPlayers } from "../../actions/players";

class TeamShow extends Component {
  componentDidMount() {
    this.props.getTeams();
    this.props.fetchPlayers();
  }

  handleOnDelete = event => {
    event.preventDefault();
    const teamId = this.props.match.params.id;
    this.props.deleteTeam(teamId);
    this.props.history.push("/");
  };

  render() {
    const teamShow = () => {
      const players = this.props.players;
      const teamId = this.props.match.params.id;
      const sortedTeamPlayers = players.filter(
        player => player.team_id === teamId
      );
      if (sortedTeamPlayers.length === 0) {
        return <p>Please add players to your roster in the form below.</p>;
      } else {
        return sortedTeamPlayers.map(player => {
          return (
            <div key={player._id}>
              <img
                className="PlayerShow"
                src={player.image_url}
                alt={player.name}
              />
              <br />
              {player.name}
            </div>
          );
        });
      }
    };
    return (
      <div>
        <h1> Roster </h1>
        <h2>{teamShow()}</h2>
        <PlayerForm />
        <button onClick={this.handleOnDelete}>Delete Team</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    players: state.players
  };
};

export default connect(
  mapStateToProps,
  { getTeams, fetchPlayers, deleteTeam }
)(TeamShow);
