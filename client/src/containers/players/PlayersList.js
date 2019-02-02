import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerCard from "../../components/players/PlayerCard";
import { getTeams } from "../../actions/teams";
import { fetchPlayers } from "../../actions/players";
import "../../assets/Players.scss";
import "../../assets/Teams.scss";

class PlayersList extends Component {
  componentDidMount() {
    this.props.getTeams();
    this.props.fetchPlayers();
  }

  render() {
    const currentUserId = this.props.auth.user.userId;
    const players = this.props.players;
    const displayPlayers = players
      .filter(player => player.author === currentUserId)
      .sort((a, b) => {
        return b.likes - a.likes;
      })
      .map(player => <PlayerCard key={player._id} player={player} />);
    return (
      <div className="PlayersContainer">
        <h1>Players</h1>
        {displayPlayers}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    teams: state.teams,
    players: state.players,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getTeams, fetchPlayers }
)(PlayersList);
