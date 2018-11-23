import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers } from "../../actions/players";
import { deletePlayer } from "../../actions/players";
import "../../assets/Show.scss";

class PlayerShow extends Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }

  handleOnDelete = () => {
    this.props.deletePlayer(this.props.match.params.id);
    this.props.history.push("/");
  };

  render() {
    const playerShow = () => {
      const players = this.props.players;
      const playerId = this.props.match.params.id;
      const sortedPlayers = players.filter(player => player._id === playerId);
      return sortedPlayers.map(player => {
        return (
          <div key={player._id} className="player-wrapper">
            <img
              className="PlayerImage"
              src={player.image_url}
              alt={player.name}
            />
            <h2>{player.name}</h2>
            <p>Height: {player.height} cm</p> <p>Weight: {player.weight} lb</p>
          </div>
        );
      });
    };
    return (
      <div>
        <h1> Player </h1>
        <h2>{playerShow()}</h2>
        <button className="submit-button" onClick={this.handleOnDelete}>
          Delete Player
        </button>
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
  { fetchPlayers, deletePlayer }
)(PlayerShow);
