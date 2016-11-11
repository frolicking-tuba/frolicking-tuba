//signup

import React from 'react';
import { withRouter, Link } from 'react-router';
import {
  Panel, Grid, Row, Col
} from 'react-bootstrap';
import AuthForm from './AuthForm.jsx';

const Signup = () => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3}>
        <Panel header="Create an Account" className="signup-form-container">
          <AuthForm />
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col md={6} mdOffset={3} className="no-account">
        <p>Already have an account?<Link
          to="/signin"
        >Sign In
        </Link></p>
      </Col>
    </Row>
  </Grid>
);

export default withRouter(Signup);
