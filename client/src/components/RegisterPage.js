import React, { Component } from "react";
import Register from "./Register";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import { addFlashMessage } from "../actions/creators/flashMessages.js";
import PropTypes from "prop-types";

class RegisterPage extends React.Component {
  render() {
    const { registerUser, addFlashMessage } = this.props;
    return (
      <div>
        <Register
          registerUser={registerUser}
          addFlashMessage={addFlashMessage}
        />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  registerUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(
  null,
  { registerUser, addFlashMessage }
)(RegisterPage);
