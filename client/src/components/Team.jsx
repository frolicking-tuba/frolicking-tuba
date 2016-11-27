import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const teamMembers = [
  {
    name: 'Mason Clayton',
    description: 'description',
    image: 'https://s3-us-west-1.amazonaws.com/'
      + 'tuba-images-bucket/MasonClayton-sqc-smw.jpg'
  },
  {
    name: 'Sean Yang',
    description: 'description',
    image: 'https://s3-us-west-1.amazonaws.com/'
      + 'tuba-images-bucket/SeanYang-sqc-smw.jpg'
  },
  {
    name: 'Teague Ashburn',
    description: 'description',
    image: 'https://s3-us-west-1.amazonaws.com/'
      + 'tuba-images-bucket/TeagueAshburn-sqc-smw.jpg'
  },
  {
    name: 'Timur Zhartybayev',
    description: 'description',
    image: 'https://s3-us-west-1.amazonaws.com/'
      + 'tuba-images-bucket/TimurZhartybayev-sqc-smw.jpg'
  }
];

const Team = () => (
  <Grid id="team-profiles">
    <Row>
      <Col xs={12} sm={12} md={12}>
        <h1>Markup Team</h1>
      </Col>
    </Row>
    <Row>
      {
        teamMembers.map((member) => (
          <Col xs={12} sm={6} md={3}>
            <img
              className="profile-image"
              width="225"
              role="presentation"
              src={member.image}
            />
            <h3>{member.name}</h3>
          </Col>
        ))
      }
    </Row>
  </Grid>
);

export default Team;
