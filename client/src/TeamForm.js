import React from "react";
import PropTypes from "prop-types";

const TeamForm = props => (
  <form onSubmit={props.submitTeam}>
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={props.name}
      onChange={props.handleOnChange}
    />
    <label htmlFor="wins">Wins:</label>
    <input
      type="number"
      name="wins"
      placeholder="Wins"
      value={props.wins}
      onChange={props.handleTextChange}
    />
    <label htmlFor="losses">Losses:</label>
    <input
      type="number"
      name="losses"
      placeholder="Losses"
      value={props.losses}
      onChange={this.handleOnChange}
    />
    <label htmlFor="logo_url">Logo url:</label>
    <input
      type="text"
      name="logo_url"
      placeholder="insert your logo url"
      value={props.logo_url}
      onChange={this.handleOnChange}
    />
    <button type="submit">Submit</button>
  </form>
);

TeamForm.propTypes = {
  submitTeam: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  wins: PropTypes.number,
  losses: PropTypes.number,
  logo_url: PropTypes.string
};

TeamForm.defaultProps = {
  name: "",
  wins: 0,
  losses: 0,
  logo_url: ""
};

export default TeamForm;
