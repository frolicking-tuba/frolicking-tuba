import React, { PropTypes } from 'react';
import {
  Panel,
  FormGroup,
  InputGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

const Title = ({ text }) => (
  <span>{text}</span>
);

Title.propTypes = { text: PropTypes.string };

const Key = ({ title, endpoint, keyString }) => (
  <Panel header={<Title text={title} />}>
    <FormGroup>
      <ControlLabel>Endpoint</ControlLabel>
      <FormControl componentClass="select">
        <option>{endpoint}</option>
        <option>{endpoint}</option>
        <option>{endpoint}</option>
      </FormControl>
    </FormGroup>

    <FormGroup>
      <ControlLabel>API Key</ControlLabel>
      <InputGroup>
        <FormControl type="text" defaultValue={keyString} />
        <InputGroup.Button><Button>Copy</Button></InputGroup.Button>
      </InputGroup>
    </FormGroup>
  </Panel>
);

Key.propTypes = {
  title: PropTypes.string,
  endpoint: PropTypes.string,
  keyString: PropTypes.string
};

export default Key;