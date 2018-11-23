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
    const sortedPlayerHeight = this.props.players.sort((a, b) => {
      return b.likes - a.likes;
    });
    return (
      <div className="PlayersContainer">
        <h1>Players</h1>
        {sortedPlayerHeight.map(player => (
          <PlayerCard key={player._id} player={player} />
        ))}
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
  { getTeams, fetchPlayers }
)(PlayersList);
