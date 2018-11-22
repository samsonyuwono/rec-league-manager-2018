import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerCard from "../../components/players/PlayerCard";
import { fetchPlayers } from "../../actions/players";
import "../../assets/Players.scss";

class PlayersList extends Component {
  componentDidMount() {
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
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    players: state.players
  };
};

export default connect(
  mapStateToProps,
  { fetchPlayers }
)(PlayersList);
