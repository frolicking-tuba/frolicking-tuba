import React, { Component, PropTypes } from 'react';
import { Row, Col, Grid, Button, Image } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/AppActions';

import Key from './Key.jsx';
// import CreateKeyModal from './CreateKeyModal.jsx';
// import EditKeyModal from './EditKeyModal.jsx';
import ApiKeyModal from './ApiKeyModal.jsx';

class Dashboard extends Component {
  componentWillMount() {
    this.props.actions.getApiKeys();
    this.props.actions.fetchUrls();
    this.props.actions.fetchGithubAuthStatus();
  }

  render() {
    return (
      <Grid>
        <Row>
          <div className="create-api-key-div">
            <Button
              bsStyle="link"
              onClick={() => this.props.actions.showApikeyModal()}
              className="pull-right"
            >
              <Image className="plus-sign-icon" src="/plus_sign.svg" />
              <span className="create-api-key">
                Create API Key
              </span>
            </Button>
          </div>
          <ApiKeyModal />
        </Row>
        <Row>
          <Col>
            {
              this.props.keys.map((key) => (
                <Key
                  title={key.name}
                  endpoint={key.endpoint}
                  keyString={key.key}
                  key={key.key + key.updatedAt}
                />
              ))
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.object),
  showApikeyModal: PropTypes.func,
  actions: PropTypes.objectOf(PropTypes.any)
};

const mapStateToProps = (state) => ({ keys: state.keys.data });

const mapDispatchToProps
  = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

