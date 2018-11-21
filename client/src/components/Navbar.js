import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/Navbar.scss";

const Navbar = () => (
  <div className="nav-wrapper">
    <ul className="nav-list">
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
    </ul>
  </div>
);

export default Navbar;
