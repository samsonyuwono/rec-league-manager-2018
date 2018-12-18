import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

let API_URL = "http://localhost:5000/api";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }
  handleOnChange = event => {
    const { value, name } = event.target;
    console.log(event.target);
    this.setState({
      [name]: value
    });
  };

  handleOnSubmit = event => {
    const { username, password } = this.state;

    axios.post("/api/register", { username, password }).then(result => {
      this.props.history.push("/");
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
            <Link to="/login">Already have an account?</Link>
          </p>
        </div>
        <h1>Register Here</h1>
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
            type="text"
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

export default Register;
