import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      errors: {},
      isLoading: false
    };
  }
  j;
  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    axios
      .post("/api/login", { username, password })
      .then(result => {
        console.log(result);
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ loggedIn: true });
        debugger;
        this.props.history.push("/");
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert("Login failed. Username or password not match");
        }
      });
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
            <Link to="/register">Need to register?</Link>
          </p>
          <h1> Login Here</h1>
        </div>
        <form onSubmit={this.handleOnSubmit}>
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

export default Login;
