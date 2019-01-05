import React, { Component } from "react";
import { connect } from "react-redux";
import TeamDropDown from "../teams/TeamDropDown";

import { updatePlayerFormData } from "../../actions/creators/playerForm";
import { fetchPlayers, editPlayer } from "../../actions/players";

class PlayerEditForm extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchPlayers();
  }

  componentDidMount() {
    const allPlayers = this.props.players;
    const currentPlayer = this.props.match.params.id;
    const playerFormData = allPlayers.filter(
      allPlayer => allPlayer.id === currentPlayer
    );
    this.props.updatePlayerFormData(playerFormData);
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    const currentPlayerFormData = Object.assign({}, this.props.playerFormData, {
      [name]: value
    });
    this.props.updatePlayerFormData(currentPlayerFormData);
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const playerId = this.props.match.params.id;
    this.props.editPlayer(playerId, this.props.playerFormData);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="form-wrapper">
        <h1>Update your Player</h1>
        <form onSubmit={event => this.handleOnSubmit(event)}>
          <div className="label-container">
            <label htmlFor="playerName">Player Name: </label>
            <input type="text" name="name" onChange={this.handleOnChange} />
          </div>
          <div className="label-container">
            <label htmlFor="playerheight">Player Height: </label>
            <input type="number" name="height" onChange={this.handleOnChange} />
          </div>
          <div className="label-container">
            <label htmlFor="playerWeight">Player Weight: </label>
            <input type="number" name="weight" onChange={this.handleOnChange} />
          </div>
          <div className="label-container">
            <label htmlFor="playerImage">Player Image: </label>
            <input
              type="text"
              name="image_url"
              onChange={this.handleOnChange}
            />
          </div>
          <TeamDropDown />

          <button className="submit-button" type="submit">
            Edit Player
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.players,
    playerFormData: state.playerFormData
  };
};

export default connect(
  mapStateToProps,
  { updatePlayerFormData, editPlayer, fetchPlayers }
)(PlayerEditForm);
