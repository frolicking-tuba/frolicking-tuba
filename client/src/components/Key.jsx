import React, { PropTypes } from 'react';
import {
  Panel,
  FormGroup,
  InputGroup,
  ControlLabel,
  FormControl,
  Button,
  Image
} from 'react-bootstrap';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import * as Actions from '../actions/AppActions';

const Title = ({ text }) => (
  <span id="apikeyname"><h4>{text}</h4></span>
);

Title.propTypes = { text: PropTypes.string };

const Key = ({ title, endpoint, keyString, showApikeyModal }) => {
  const onSettingsClick = () => {
    // set editKeyModal.show = true and editKey = keyString
    showApikeyModal(keyString);
  };

  const scriptTagText = `<script src="https://d1p3e8i5yp3axf.cloudfront.net/\
?key=${keyString}"></script>`;

  return (
    <Panel
      header={
        <div>
          <Title text={title} />
          <Button
            bsStyle="link"
            onClick={onSettingsClick}
            className="pull-right settings-button"
          >
            <Image src="/settings.svg" />
          </Button>
        </div>
      }
    >
      <FormGroup>
        <ControlLabel>Endpoint</ControlLabel>
        <FormControl
          type="text"
          className="no-extras-input"
          disabled defaultValue={endpoint}
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>API Key</ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            disabled
            className="no-extras-input"
            defaultValue={scriptTagText}
          />
          <InputGroup.Button>
            <CopyToClipboard text={scriptTagText}>
              <Button>Copy</Button>
            </CopyToClipboard>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Panel>
  );
};

Key.propTypes = {
  title: PropTypes.string,
  endpoint: PropTypes.string,
  keyString: PropTypes.string,
  showApikeyModal: PropTypes.func
};

export default connect(null, Actions)(Key);
