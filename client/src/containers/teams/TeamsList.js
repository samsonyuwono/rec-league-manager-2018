import React, { Component } from "react";
import { connect } from "react-redux";
import TeamCard from "../../components/teams/TeamCard";
import { getTeams, deleteTeam } from "../../actions/teams";
import "../../assets/Teams.scss";

class TeamsList extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    debugger;
    const currentUserTeams = this.props.auth.user.userId;
    const teams = this.props.teams;
    const displayTeam = teams
      .filter(team => team.author === currentUserTeams)
      .sort((a, b) => {
        return b.wins - a.wins;
      })
      .map(team => <TeamCard key={team._id} team={team} />);
    return (
      <div className="TeamsContainer">
        <h1>Teams</h1>
        <div key={this.props} className="col-md-4">
          {displayTeam}
        </div>
        <div className="col-md-8">{this.props.children}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    teams: state.teams,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getTeams, deleteTeam }
)(TeamsList);
