import { connect } from 'react-redux';
import { toggleLoggedin } from '../actions';
import Navbar from '../components/Navbar.jsx';

const mapStateToProps = (state) => ({ loggedIn: state.loggedin });

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: () => {
    dispatch(toggleLoggedin());
  }
});

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default NavbarContainer;
