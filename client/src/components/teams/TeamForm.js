import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTeamFormData } from "../../actions/teamForm";
import { createTeam } from "../../actions/teams";

class TeamForm extends Component {
  handleOnChange = event => {
    const { name, value } = event.target;
    const currentTeamFormData = Object.assign({}, this.props.teamFormData, {
      [name]: value
    });
    this.props.updateTeamFormData(currentTeamFormData);
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.createTeam(this.props.teamFormData);
  };

  render() {
    const { name, wins, losses, logo_url } = this.props.teamFormData;
    return (
      <div className="teamForm">
        <h1>Add a team to the League</h1>
        <form onSubmit={this.handleOnSubmit}>
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
            <label htmlFor="wins">Wins:</label>
            <input
              type="number"
              onChange={this.handleOnChange}
              name="wins"
              value={wins}
            />
          </div>
          <div>
            <label htmlFor="losses">Losses:</label>
            <input
              type="number"
              onChange={this.handleOnChange}
              name="losses"
              value={losses}
            />
          </div>
          <div>
            <label htmlFor="logo_url">Logo url:</label>
            <input
              type="text"
              onChange={this.handleOnChange}
              name="logo_url"
              value={logo_url}
            />
          </div>

          <button type="submit">Add Team</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teamFormData: state.teamFormData
  };
};

export default connect(
  mapStateToProps,
  { updateTeamFormData, createTeam }
)(TeamForm);
