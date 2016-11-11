import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';
import { renderTextField, validateAuthForm } from './FormHelpers.jsx';


class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(values) {
    this.props.signInUser(values, window.location.pathname);
  }

  renderAuthenticationError() {
    if (typeof this.props.authenticationError === 'string') {
      return (<div className="alert alert-danger">
        { this.props.authenticationError }
      </div>);
    }

    return <span />;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container auth-form">
        { this.renderAuthenticationError() }

        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field
            name="email"
            component={renderTextField}
            className="form-control"
            type="text"
            label="Email"
          />
          <Field
            name="password"
            component={renderTextField}
            className="form-control"
            type="password"
            label="Password"
          />

          <button
            action="submit"
            id="auth-submit-button"
          >
            Submit
          </button>
        </form>
      </div>

    );
  }
}

AuthForm.propTypes = {
  signInUser: PropTypes.func,
  authenticationError: PropTypes.oneOfType([null, React.PropTypes.string]),
  handleSubmit: PropTypes.func
};


const mapStateToProps = (state) => (
  { authenticationError: state.auth.error }
);


export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'login',
  validateAuthForm
})(AuthForm));
