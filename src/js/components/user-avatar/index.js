import React, { Component } from 'react';
import styled from 'styled-components';
import { UserCircle } from 'styled-icons/fa-solid';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: ${p => p.size || '35px'};
  height: ${p => p.size || '35px'};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${p => p.colour};
  background: ${p => p.colour};
  margin: 0;

  > img {
    width: ${p => p.size || '35px'};
  }
`;

class UserAvatar extends Component {
  state = {
    error: false
  };

  handleError = () => this.setState({ error: true });

  render() {
    if (this.state.error || !this.props.path) {
      return <UserCircle height={this.props.size || '35px'} color={this.props.colour} />
    }

    return (
      <Wrapper colour={this.props.colour} size={this.props.size}>
        <img src={this.props.path} alt='avatar' 
        onError={this.handleError}/>
      </Wrapper>
    );
  }
}

UserAvatar.propTypes = {
  colour: PropTypes.string.isRequired,
  path: PropTypes.string
};

export default UserAvatar;