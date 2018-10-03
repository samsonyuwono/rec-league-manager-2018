import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateTeamFormData } from '../../actions/teamForm';
import { getTeams, editTeam } from '../../actions/teams';

class TeamEditForm extends Component {

  componentWillMount(){
    this.props.getTeams()
  }

  componentDidMount(){
    const allTeams = this.props.teams
    const currentTeam = this.props.match.params.id
    const teamFormData = allTeams.filter(allTeam => allTeam.id === currentTeam)
    this.props.updateTeamFormData(teamFormData)
  }

  handleOnChange = event => {
    const { name, value } = event.target
    const currentTeamFormData = Object.assign({}, this.props.teamFormData, {
      [name]: value
    })
    this.props.updateTeamFormData(currentTeamFormData)
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const teamId = this.props.match.params.id
    this.props.editTeam(teamId, this.props.teamFormData)
    this.props.history.push('/')
  }

  render() {
    return(
      <div className ="editTeamForm">
      <h1>Update your team</h1>
      <form onSubmit = {event => this.handleOnSubmit(event) }>
      <label htmlFor="teamName">Team Name: </label>
        <input
        type="text"
        name="name"
        onChange={this.handleOnChange}

        />
        <br></ br>

      <label htmlFor="teamWins">Team Wins: </label>
        <input

        type="number"
        name="wins"
        onChange={this.handleOnChange}
        />
        <br></ br>

      <label htmlFor="teamlosses">Team Losses: </label>
        <input
        type="number"
        name="losses"
        onChange={this.handleOnChange}
        />
        <br></ br>
      <label htmlFor="teamLogo">Team Logo: </label>
        <input

        type="text"
        name="logo_url"
        onChange={this.handleOnChange}
        />
        <br></ br>
        <input type="submit" value="Edit Team" />
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    teamFormData: state.teamFormData
  }
}

export default connect (mapStateToProps, {updateTeamFormData, editTeam, getTeams})(TeamEditForm)
