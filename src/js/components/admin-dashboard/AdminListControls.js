import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import { Unlock, Lock } from 'styled-icons/fa-solid';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import { Pin } from 'styled-icons/octicons';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => {
  return {
    resolvePost: (id, token) => dispatch(apiActions.resolvePost(id, token)),
    pinPost: (id, token) => dispatch(apiActions.pinPost(id, token))
  };
};

const mapStateToProps = state => {
  return {
    user: state.apiState.user
  };
};

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: auto;
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6px;
  outline: 0;

  > div {
    border-radius: 50%;
    padding: 4px;
    background: ${p => (p.highlight ? p.highlightColour : '#acacac')};
    border: 1px solid ${p => (p.highlight ? p.highlightColour : '#acacac')};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease-in-out;
    cursor: pointer;
    outline: 0;

    &:hover {
      background: white;
      border: 1px solid ${p => (p.highlight ? p.highlightColour : p.colour)};
      svg {
        transition: all .3s ease-in-out;
        color: ${p => (p.highlight ? p.highlightColour : p.colour)};
      }
    }
  }
`;

const AdminListControls = ({ id, isPinned, isResolved, user, pinPost, resolvePost, ...rest }) => {
  return (
    <Wrapper>
      <Tippy content={isResolved ? 'Unresolve' : 'Resolve'} arrow={true}>
        <Metric {...rest} highlight={isResolved}>
          <div onClick={e => e.stopPropagation() & resolvePost(id, user)}>
            {
              isResolved ?
              <Lock size={'.8em'} color={'white'} /> :
              <Unlock size={'.8em'} color={'white'} />
            }
          </div>
        </Metric>
      </Tippy>
      <Tippy content={isPinned ? 'Unpin' : 'Pin'} arrow={true}>
        <Metric {...rest} highlight={isPinned}>
          <div onClick={e => e.stopPropagation() & pinPost(id, user)}><Pin size={'.8em'} color={'white'} /></div>
        </Metric>
      </Tippy>
    </Wrapper>
  );
};

AdminListControls.propTypes = {
  isPinned: PropTypes.bool.isRequired,
  isResolved: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }),
  pinPost: PropTypes.func.isRequired,
  resolvePost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminListControls);