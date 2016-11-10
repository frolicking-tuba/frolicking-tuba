import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as Actions from '../actions/AppActions';

class NavbarComponent extends Component {

  runlogout() {
    this.props.logOut();
  }

  render() {

    const teamLink = (<NavItem eventKey={3}>
      <Link
        to="/team"
      >Team</Link>
    </NavItem>);

    const dashboardLink = (<NavItem eventKey={3}>
      <Link
        to="/dashboard"
      >Dashboard</Link>
    </NavItem>);

    const authLinks = (
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link
            to="/signup"
          >Sign Up</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link
            to="/signin"
          >Log In
          </Link>
        </NavItem>
      </Nav>);

    const documentationLink = (<NavItem eventKey={1}>
      <Link
        to="/documentation"
      >Documentation</Link>
    </NavItem>
    );

    const profileDropdown = (<Nav pullRight>
      <NavDropdown
        eventKey={3}
        title={this.props.email}
        id="basic-nav-dropdown"
      >
        <MenuItem
          eventKey={3.1}
        >Profile</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.2}>
          <Link to="/" onClick={() => this.runlogout()}>Log Out</Link>
        </MenuItem>
      </NavDropdown>
    </Nav>);

    const loggedInNav = (
      <Nav pullRight>
        {dashboardLink}
        {documentationLink}
        {profileDropdown}
      </Nav>
    );


    if (this.props.onAuthPage()) {
      return (
        <div className="authPageHeader">
          <Link
            to="/"
            id="authPageLogo"
          >MARKUP
          </Link>
        </div>
      );
    }

    return (
      <Navbar
        className={`navbar-${this.props.onHomePage()}`}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link
              to="/"
            >MARKUP</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.props.authenticated ? '' : documentationLink}
            {this.props.authenticated ? '' : teamLink}
          </Nav>
          {this.props.authenticated ? loggedInNav : authLinks}
        </Navbar.Collapse>
      </Navbar>
      );
  }

}


NavbarComponent.propTypes = {
  authenticated: PropTypes.oneOfType([PropTypes.func, PropTypes.boolean]),
  logOut: PropTypes.func,
  email: PropTypes.string,
  onHomePage: PropTypes.func,
  onAuthPage: PropTypes.func
};

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
    email: state.auth.email
  }
);

export default connect(mapStateToProps, Actions)(NavbarComponent);

//Add code back in when wanting to show active page states in nav
//<li className="active"><a href="#">Link <span className="sr-only">
//(current)</span></a></li>
