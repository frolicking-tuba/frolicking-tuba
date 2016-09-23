import React, { PropTypes } from 'react';

const Navbar = ({ loggedIn, onLoginClick }) => (
  <div>
    Navbar Component
    <button onClick={() => onLoginClick()}>Toggle LogIn </button>
    {loggedIn ? <span>Sign Out</span> : <span>Log In / Sign Up</span>}
  </div>
);

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
  onLoginClick: PropTypes.func
};

export default Navbar;
