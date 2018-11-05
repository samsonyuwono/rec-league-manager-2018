import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTeamFormData } from "../../actions/teamForm";
import { createTeam } from "../../actions/teams";

class TeamForm extends Component {
  handleOnWin = event => {
    const { name, value } = event.target;
    const currentWinData = Object.assign({}, this.props.teamFormData, {
      [name]: Number(value)
    });

    this.props.updateTeamFormData(currentWinData);
  };

  handleOnLoss = event => {
    const { name, value } = event.target;
    const currentLossData = Object.assign({}, this.props.teamFormData, {
      [name]: Number(value)
    });
    this.props.updateTeamFormData(currentLossData);
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    const currentTeamFormData = Object.assign({}, this.props.teamFormData, {
      [name]: value
    });
    this.props.updateTeamFormData(currentTeamFormData);
    debugger;
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
              onChange={this.handleOnWin}
              name="wins"
              value={wins}
            />
          </div>
          <div>
            <label htmlFor="losses">Losses:</label>
            <input
              type="number"
              onChange={this.handleOnLoss}
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
  {
    updateTeamFormData,
    createTeam
  }
)(TeamForm);
