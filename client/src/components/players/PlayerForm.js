import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayerFormData } from '../../actions/playerForm';
import { createPlayer } from '../../actions/players';
import TeamDropDown from '../teams/TeamDropDown'

class PlayerForm extends Component {

  handleOnChange = event => {
    const { name, value } = event.target;
    const currentPlayerFormData = Object.assign({}, this.props.playerFormData, {
      [name]: value,
    })
    this.props.updatePlayerFormData(currentPlayerFormData)
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.createPlayer(this.props.playerFormData, this.props.history)
  }

  render() {
    const { name, height, weight, image_url } = this.props.playerFormData;

    return (
      <div className='playerForm'>
        <h1>Add a player to your team</h1>
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              onChange={this.handleOnChange}
              name="name"
              value={name}
            />
          </div>
          <div>
            <label htmlFor="height">Height(cm):</label>
            <input
              type="number"
              onChange={this.handleOnChange}
              name="height"
              value={height}
            />
          </div>
          <div>
            <label htmlFor="weight">Weight(lb):</label>
            <input
              type="number"
              onChange={this.handleOnChange}
              name="weight"
              value={weight}
            />
          </div>
          <div>
            <label htmlFor="image_url">Image url:</label>
            <input
              type="text"
              onChange={this.handleOnChange}
              name="image_url"
              value={image_url}
            />
          </div>

          <TeamDropDown />

          <button type="submit">Add Player</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playerFormData: state.playerFormData,
  }
}

export default connect(mapStateToProps, {updatePlayerFormData, createPlayer})(PlayerForm);
