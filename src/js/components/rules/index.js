import React from 'react';
import styled from 'styled-components';
import { Grid, GridItem } from 'styled-grid-responsive';

const Wrapper = styled.div`
  padding: 20px;
  color: #676767;
  text-align: left;

  > h1 {
    text-align: center;
    margin-bottom: 10%;
    color: #676767;
    text-align: center;
    letter-spacing: .1em;
  }

  > ul {
    line-height: 2em;
    margin-bottom: 10%;
  }
`;

export default () => (
  <Grid center>
    <GridItem col={2/4} media={{ phone: 1, tablet: 3/4 }}>
      <Wrapper>
        <h1>Awarewolf Code of Conduct</h1>
        <ul>
          <li>Do not post anything religious, political, racist, ageist or in any way prejudicial.</li>
          <li>Do not be abusive.</li>
          <li>Keep suggestions sensible.</li>
          <li>If you can add to a post please do - you may have the answer to someone elses question.</li>
        </ul>
        <p>Awarewolf will be reviewed weekly.</p>
        <p>Instant action will be taken where possible, although bigger changes will be discussed at the end of every quarter.</p>
      </Wrapper>
    </GridItem>
  </Grid>
);