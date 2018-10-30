import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerCard from "../../components/players/PlayerCard";
import PlayerForm from "../../components/players/PlayerForm";
import { fetchPlayers } from "../../actions/players";
import "../../assets/Players.css";

class PlayersList extends Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    let players = this.props.players;
    console.log(players);
    debugger;
    const sortedPlayerHeight = players.data.sort((a, b) => {
      return b.height - a.height;
    });
    return (
      <div className="PlayersContainer">
        <h1>Players</h1>
        {sortedPlayerHeight.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
        <PlayerForm />
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
