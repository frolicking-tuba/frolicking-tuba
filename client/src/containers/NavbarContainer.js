import { connect } from 'react-redux';
import { toggleLoggedin } from '../actions';
import Navbar from '../components/Navbar.jsx';

const mapStateToProps = (state) => {
  console.log(state.loggedIn);

  return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: () => {
    console.log('toggleLoggedin inside NavbarContainer: ', toggleLoggedin);
    dispatch({ type: 'TOGGLE_LOGGEDIN' });
  }
});

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default NavbarContainer;
