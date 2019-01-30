import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import "../assets/MobileNav.scss";

class GuestNav extends Component {
  render() {
    return (
      <ul className={this.state.showMenu ? "toggle-list" : "nav-list"}>
        <li>
          <NavLink
            to="/"
            exact
            activeStyle={
              {
                // background: "#D1D0CE"
              }
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/register" exact>
            Sign Up
          </NavLink>
        </li>

        <li>
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(GuestNav);
