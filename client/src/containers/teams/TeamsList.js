import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamCard from '../../components/teams/TeamCard';
import TeamForm from '../../components/teams/TeamForm';
import { getTeams, deleteTeam } from '../../actions/teams'
import '../../assets/Teams.css'


class TeamsList extends Component {

  componentDidMount() {
    this.props.getTeams()
  }


  render() {
    const sortedTeamWins = this.props.teams.sort((a,b) => { return b.wins - a.wins})
    return (
    <div className= "TeamsContainer">
      <h1>Teams</h1>
      <div className="col-md-4">
      {sortedTeamWins.map(team => <TeamCard key={team.id} team=
        {team} />)}
      </div>
        <div className="col-md-8">
        {this.props.children}
        <TeamForm />
      </div>
   </div>
    );
  }
}
const mapStateToProps = (state) => {
  return ({
    teams: state.teams
  })
}

export default connect(mapStateToProps, { getTeams, deleteTeam })(TeamsList);
