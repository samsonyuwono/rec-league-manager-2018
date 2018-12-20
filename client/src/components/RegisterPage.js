import React, { Component } from "react";
import Register from "./Register";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import PropTypes from "prop-types";

class RegisterPage extends React.Component {
  render() {
    const { registerUser } = this.props;
    return (
      <div>
        <Register registerUser={registerUser} />
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(RegisterPage);
