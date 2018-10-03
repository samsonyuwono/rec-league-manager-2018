import React, {Component } from 'react';
import { connect } from 'react-redux';
import { increaseWin, increaseLoss } from '../../actions/teams';
import { bindActionCreators } from 'redux';

class TeamWinLoss extends Component {

  constructor(props) {
    super(props)
    this.state = {
      teamId: this.props.team,
      wins: this.props.wins,
      losses: this.props.losses
    }
  }

  handleWin = event => {
    if(this.state.wins + this.state.losses >= 82){
      return this.state.wins
    }
    else{
      this.setState({
        wins: this.state.wins + 1
        })
      this.props.increaseWin(this.props.wins, this.props.team)
    }
  }

  handleLoss = event => {
    if(this.state.wins + this.state.losses >= 82){
      return this.state.losses
    }
    else{
      this.setState({
        losses: this.state.losses + 1
        })
    this.props.increaseLoss(this.props.losses, this.props.team)
    }
  }

  render(){
    const wins = this.state.wins
    const losses = this.state.losses
    return (
      <div>
      <button onClick={(event)=> this.handleWin(this.props.wins)}>Wins</button>{wins}
      <button onClick={(event) => this.handleLoss(this.props.losses)}>Losses</button>{losses}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      teams: state.teams,
    }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increaseWin: increaseWin,
      increaseLoss: increaseLoss
    }, dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamWinLoss);
