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
    console.log(event.target);
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
        localStorage.setItem("jwtToken", result.data.token);
        this.setState({ loggedIn: true });
        this.props.history.push("/");
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            message: "Login failed. Username or password not match"
          });
        }
      });
  };

  // handleOnSubmit = event => {
  //   event.preventDefault();
  //   fetch(`${API_URL}/regi`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       mode: "no-cors"
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //     .then(res => {
  //       if (res.status === 200) {
  //         this.props.history.push("/");
  //         console.log("success!");
  //       } else {
  //         const error = new Error(res.error);
  //         throw error;
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       alert("Error logging in please try again");
  //     });
  // };

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
            type="text"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleOnChange}
            error={errors.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleOnChange}
            error={errors.password}
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
