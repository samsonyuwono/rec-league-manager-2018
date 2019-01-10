import React, { Component } from "react";
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
      <div className="form-wrapper">
        <h1> Login Here</h1>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          {errors.form && (
            <div className="alert alert-danger">{errors.form}</div>
          )}
          <div className="label-container">
            <input
              type="username"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleOnChange}
              error={errors.username}
              required
            />
          </div>
          <div className="label-container">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              error={errors.password}
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

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginUser, addFlashMessage }
)(Login);
