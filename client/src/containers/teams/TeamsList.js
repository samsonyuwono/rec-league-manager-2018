import React, { Component } from "react";
import { connect } from "react-redux";
import TeamCard from "../../components/teams/TeamCard";
import TeamForm from "../../components/teams/TeamForm";
import { getTeams, deleteTeam } from "../../actions/teams";
import "../../assets/Teams.css";

class TeamsList extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    const displayTeam = this.props.teams
      .sort((a, b) => {
        return a.wins - b.wins;
      })
      .map(team => <TeamCard key={team.id} team={team} />);
    return (
      <div className="TeamsContainer">
        <h1>Teams</h1>
        <div key={this.props} className="col-md-4">
          {displayTeam}
        </div>
        <div className="col-md-8">
          {this.props.children}
          <TeamForm />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { getTeams, deleteTeam }
)(TeamsList);
