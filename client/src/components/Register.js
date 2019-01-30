import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import { addFlashMessage } from "../actions/flashMessages";
import "../assets/Forms.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addFlashMessage({
      type: "success",
      text: "You've signed up successfuly. Welcome"
    });
    this.props.registerUser(this.state, this.props.history.push("/login"));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="form-wrapper">
        <h1>Register Here</h1>
        <form onSubmit={this.handleOnSubmit}>
          <div className="label-container">
            <input
              type="username"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleOnChange}
              required
            />
          </div>
          <div className="label-container">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleOnChange}
              required
            />
          </div>
          <button className="submit-button" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser, addFlashMessage }
)(Register);
