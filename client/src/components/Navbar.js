import React from 'react'
import { NavLink } from 'react-router-dom'


const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: '#B6B6B4',
  textDecoration: 'none',
  color: 'white',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
}


const Navbar = () =>
  <div className='navbar'>
    <NavLink
    to='/'
    exact
    style={link}
    activeStyle={{
      background: '#D1D0CE'
    }}>Home</NavLink>

    <NavLink
    to='/teams'
    exact
    style={link}
    activeStyle={{
      background: '#D1D0CE'
    }}>Teams</NavLink>

    <NavLink
      to='/teams/new'
      exact
      style={link}
      activeStyle={{
      background: '#D1D0CE'
    }}>Add a team</NavLink>

    <NavLink
      to='/players'
      exact
      style={link}
      activeStyle={{
      background: '#D1D0CE'
    }}>Players</NavLink>


    <NavLink
    to='/players/new'
    exact
    style={link}
    activeStyle={{
      background: '#D1D0CE'
    }}>Add a player</NavLink>

    <NavLink
    to='/teams/standings'
    exact
    style={link}
    activeStyle={{
      background: '#D1D0CE'
    }}>Standings</NavLink>
  </div>


export default Navbar;
