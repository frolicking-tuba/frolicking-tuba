//login

import React from 'react';
import { withRouter, Link } from 'react-router';

import {
  Panel, Grid, Row, Col
} from 'react-bootstrap';

import AuthForm from './AuthForm.jsx';

const Signin = () => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3}>
        <Panel
          header="Welcome Back!"
          className="signup-form-container"
        >
          <AuthForm />
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col md={6} mdOffset={3} className="no-account">
        <p>Don't have an account?<Link
          to="/signup"
        >Sign Up
        </Link></p>
      </Col>
    </Row>
  </Grid>
);

export default withRouter(Signin);
