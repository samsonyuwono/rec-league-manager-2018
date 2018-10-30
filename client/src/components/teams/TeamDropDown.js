import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePlayerFormData } from "../../actions/playerForm";
import { getTeams } from "../../actions/teams";

class TeamDropDown extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

  handleTeamSelect = event => {
    const { value } = event.target;
    const currentPlayerFormData = Object.assign({}, this.props.playerFormData, {
      team_id: value
    });
    this.props.updatePlayerFormData(currentPlayerFormData);
  };

  render() {
    const teams = this.props.teams;
    const teamOptions = teams.map(team => {
      return (
        <option value={team.id} id={team.name} key={team.id}>
          {team.name}
        </option>
      );
    });
    return (
      <div>
        <label htmlFor="team_select">Select Team</label>
        <select
          value={this.props.teams.id}
          onChange={this.handleTeamSelect}
          name="team_select"
        >
          {teamOptions}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerFormData: state.playerFormData,
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { updatePlayerFormData, getTeams }
)(TeamDropDown);
