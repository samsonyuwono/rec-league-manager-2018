import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayers } from '../../actions/players'
import { deletePlayer } from '../../actions/players'

class PlayerShow extends Component {

  componentDidMount() {
    this.props.fetchPlayers()
  }

  handleOnDelete = () => {
    const playerId = this.props.match.params.id
    this.props.deletePlayer(playerId)
    this.props.history.push('/')
  }

  render(){
    const playerShow = () => {
      const players = this.props.players
      const playerId = parseInt(this.props.match.params.id)
        const sortedPlayers = players.filter(player => player.id === playerId)
          return sortedPlayers.map(player=>{
            return(
        <div key={player.id}>
          <img className="PlayerShow" src={player.image_url} alt={player.name} /><br></ br>
            <label>{player.name}</label>
            <br></ br>
            Height: {player.height} cm
            <br></ br>
            Height: {player.weight} lb
          </div>
            )
          })
      }
    return(
      <div>
      <h1> Player </h1>
      <h2>{playerShow()}</h2>
      <button onClick={this.handleOnDelete} >Delete Player</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    players: state.players
  })
}

export default connect (mapStateToProps, { fetchPlayers, deletePlayer })(PlayerShow);
