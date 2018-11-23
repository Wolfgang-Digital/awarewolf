import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { formatName, formatDate } from '../../utils';
import UserAvatar from '../user-avatar';

const Wrapper = styled.div`
  border: 1px solid ${p => (p.secondary ? p.theme.secondary : p.theme.primary)};
  border-radius: 6px;
  margin: 10px 10px 0 10px;
  padding: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: left;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    span:nth-child(1) {
      color: ${p => p.theme.darkText};
    }
    span:nth-child(2) {
      color: ${p => p.theme.lightText};
      font-weight: 300;
      font-size: .8em;
    }
  }
`;

const UserBox = ({ username, avatar, timestamp, theme, secondary, ...rest }) => (
  <Wrapper theme={theme} secondary={secondary} {...rest}>
    { <UserAvatar path={avatar} colour={secondary ? theme.secondary : theme.primary}/> }
    <div>
      <span>{ formatName(username) }</span>
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
  avatar: PropTypes.string,
  secondary: PropTypes.bool
};

export default withTheme(UserBox);