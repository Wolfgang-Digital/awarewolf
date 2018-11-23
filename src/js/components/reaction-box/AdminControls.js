import React from 'react';
import { AdminIcon } from './Styles';
import Tippy from '@tippy.js/react';
import { Pin } from 'styled-icons/octicons';
import PropTypes from 'prop-types';
import { Unlock, Lock } from 'styled-icons/fa-solid';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';

const mapDispatchToProps = dispatch => {
  return {
    resolvePost: (id, user) => dispatch(apiActions.resolvePost(id, user)),
    pinPost: (id, user) => dispatch(apiActions.pinPost(id, user))
  };
};

const mapStateToProps = state => {
  return {
    user: state.apiState.user
  };
};

const AdminControls = ({ isResolved, isPinned, even, isAdmin, theme, pinPost, resolvePost, user, id }) => (
  <React.Fragment>
    <Tippy
      content={isAdmin ? 'Resolve / Unresolve' : 'Resolved' }
      arrow={true}
    >
      <AdminIcon
        colour={!isResolved ? '#d3d3d3' : even ? theme.secondary : theme.primary}
      >
        {isResolved ?
          isAdmin ?
            <Lock size={'1em'} onClick={e => e.stopPropagation() & resolvePost(id, user)} /> :
            <Lock size={'1em'} /> :
          isAdmin ?
            <Unlock size={'1em'} onClick={e => e.stopPropagation() & resolvePost(id, user)} /> :
            null}
      </AdminIcon>
    </Tippy>
    <Tippy
      content={isAdmin ? 'Pin / Unpin' : 'Pinned' }
      arrow={true}
    >
      <AdminIcon
        colour={!isPinned ? '#d3d3d3' : even ? theme.secondary : theme.primary}
        padding={'0'}
      >
        {isPinned ? isAdmin ? <Pin size={'1.1em'} onClick={e => e.stopPropagation() & pinPost(id, user)} /> :
          <Pin size={'1.1em'} /> :
          isAdmin ? <Pin size={'1.1em'} onClick={e => e.stopPropagation() & pinPost(id, user)} /> :
            null}
      </AdminIcon>
    </Tippy>
  </React.Fragment>
);

AdminControls.propTypes = {
  isResolved: PropTypes.bool.isRequired,
  isPinned: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  even: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminControls);