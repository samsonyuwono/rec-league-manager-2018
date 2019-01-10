import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth";
import { addFlashMessage } from "../actions/flashMessages";
import "../assets/Forms.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
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
    const { username, password } = this.state;
    this.setState({ loggedIn: true });
    this.props
      .loginUser(this.state)
      .then(
        res => this.props.history.push("/"),
        err =>
          this.setState({ errors: err.response.data.errors, loggedIn: true })
      );
  };

  render() {
    const { errors, username, password, loggedIn } = this.state;
    return (
      <div>
        <div style={{ marginTop: "4rem" }} className="row">
          <Link to="/" className="btn-flat waves-effect">
            Back to home
          </Link>
          <p className="grey-text text-darken-1">
            <Link to="/register">Need to register?</Link>
          </p>
          <h1> Login Here</h1>
        </div>
        <form onSubmit={this.handleOnSubmit}>
          {errors.form && (
            <div className="alert alert-danger">{errors.form}</div>
          )}

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
            error={errors.password}
            onChange={this.handleOnChange}
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
  { loginUser, addFlashMessage }
)(Login);
