import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { formatName, formatDate } from '../../utils';
import UserAvatar from '../user-avatar';

const Wrapper = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  text-align: left;

  > div:nth-child(2) {
    margin-left: 5px;
    align-self: flex-end;

    span:nth-child(1) {
      color: ${p => p.theme.darkText};
      margin-right: 6px;
    }
    span:nth-child(2) {
      color: ${p => p.theme.lightText};
      font-size: .7em;
    }
    span:nth-child(3) {
      color: ${p => p.theme.lightText};
      font-weight: 300;
      font-size: .8em;
      margin-left: 6px;
    }
  }
`;

const UserBox = ({ username, avatar, timestamp, theme, secondary, ...rest }) => (
  <Wrapper theme={theme} {...rest}>
    { <UserAvatar size='1.5em' path={avatar} colour={secondary ? theme.secondary : theme.primary}/> }
    <div>
      <span>{ formatName(username) }</span>
      <span>&bull;</span>
      <span>{ formatDate(timestamp) }</span>
    </div>
  </Wrapper>
);

UserBox.propTypes = {
  username: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    darkText: PropTypes.string.isRequired,
    lightText: PropTypes.string.isRequired
  }),
  avatar: PropTypes.string
};

export default withTheme(UserBox);