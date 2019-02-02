import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Navbar from "./Navbar";
import GuestNav from "./GuestNav";
import "../assets/MobileNav.scss";
import "../assets/Navbar.scss";

class NavContainer extends Component {
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

    return (
      <div
        className={this.state.showMenu ? "toggle-list-wrapper" : "nav-wrapper"}
      >
        <div onClick={this.toggle} className="toggle-menu">
          <div className="bars" />
          <div className="bars" />
          <div className="bars" />
        </div>
        <Navbar />
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
)(NavContainer);
