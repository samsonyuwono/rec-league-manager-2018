import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlayerForm from "../players/PlayerForm";
import { connect } from "react-redux";
import { getTeams, deleteTeam } from "../../actions/teams";
import { fetchPlayers } from "../../actions/players";
import "../../assets/Show.scss";

class TeamShow extends Component {
  componentDidMount() {
    this.props.getTeams();
    this.props.fetchPlayers();
  }

  handleOnDelete = event => {
    event.preventDefault();
    this.props.deleteTeam(this.props.match.params.id);
    this.props.history.push("/");
  };

  render() {
    const teamShow = () => {
      const players = this.props.players;
      const teamId = this.props.match.params.id;
      const sortedTeamPlayers = players.filter(
        player => player.team_id === teamId
      );
      return sortedTeamPlayers.length === 0 ? (
        <p>Please add players to your roster in the form below.</p>
      ) : (
        sortedTeamPlayers.map(player => {
          return (
            <div key={player._id} className="player-wrapper">
              <img
                className="PlayerImage"
                src={player.image_url}
                alt={player.name}
              />
              <h2>{player.name}</h2>
              <div className="view-player">
                <Link className="link-style" to={`/players/${player._id}`}>
                  View Player
                </Link>{" "}
              </div>
            </div>
          );
        })
      );
    };
    return (
      <div className="teamShow-container">
        <h1> Roster </h1>
        {teamShow()}
        <PlayerForm />
        <button className="submit-button" onClick={this.handleOnDelete}>
          Delete Team
        </button>
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
