import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import "../assets/MobileNav.scss";
import "../assets/Navbar.scss";

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
    const { isAuthenticated } = this.props.auth;
    const guestLinks = (
      <ul className={this.state.showMenu ? "toggle-list" : "nav-list"}>
        <li>
          <NavLink
            to="/"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/register"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Sign Up
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/login"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Login
          </NavLink>
        </li>
      </ul>
    );
    const userLinks = (
      <ul className={this.state.showMenu ? "toggle-list" : "nav-list"}>
        <li>
          <NavLink
            to="/"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teams"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Teams
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teams/new"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Add a team
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/players"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Players
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/players/new"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Add a player
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teams/standings"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
          >
            Standings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            exact
            activeStyle={{
              background: "#D1D0CE"
            }}
            onClick={this.logout.bind(this)}
          >
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
