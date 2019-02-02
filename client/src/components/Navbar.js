import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import "../assets/MobileNav.scss";
import "../assets/Navbar.scss";
import FlashMessagesList from "./FlashMessagesList";
import requireAuth from "../utils/requireAuth";
import "./../assets/App.scss";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/creators/authTypes";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  toggle = event => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  logout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
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
    const userLinks = (
      <ul className={this.state.showMenu ? "toggle-list" : "nav-list"}>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/teams" exact>
            Teams
          </NavLink>
        </li>

        <li>
          <NavLink to="/teams/new" exact>
            Add a team
          </NavLink>
        </li>

        <li>
          <NavLink to="/players" exact>
            Players
          </NavLink>
        </li>

        <li>
          <NavLink to="/players/new" exact>
            Add a player
          </NavLink>
        </li>

        <li>
          <NavLink to="/teams/standings" exact>
            Standings
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" exact onClick={this.logout.bind(this)}>
            Logout
          </NavLink>
        </li>
      </ul>
    );

    return (
      <div
        className={this.state.showMenu ? "toggle-list-wrapper" : "nav-wrapper"}
      >
        <div onClick={this.toggle} className="toggle-menu">
          <div className="bars" />
          <div className="bars" />
          <div className="bars" />
        </div>
        {isAuthenticated ? userLinks : guestLinks}
      </div>
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
)(Navbar);
