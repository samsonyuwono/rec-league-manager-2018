import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";
import { addFlashMessage } from "../actions/flashMessages";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {}
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
    this.props.registerUser(this.state);
    this.props.addFlashMessage({
      type: "success",
      text: "You've signed up successfuly. Welcome"
    });
    this.props.history.push("/login");
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div style={{ marginTop: "4rem" }} className="row">
          <Link to="/" className="btn-flat waves-effect">
            Back to home
          </Link>
          <p className="grey-text text-darken-1">
            <Link to="/login">Already have an account?</Link>
          </p>
        </div>
        <h1>Register Here</h1>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <input
            type="username"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleOnChange}
            error={errors.username}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleOnChange}
            error={errors.password}
            required
          />
          <button type="submit-button" value="Submit">
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
