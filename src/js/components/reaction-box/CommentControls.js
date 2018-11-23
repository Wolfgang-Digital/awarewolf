import React from 'react';
import { Button } from '../../shared';
import PropTypes from 'prop-types';
import { CommentAlt } from 'styled-icons/fa-solid';

const CommentControls = ({ openEditor, colour }) => (
  <React.Fragment>
    <Button><CommentAlt size={'1em'} color={colour} /></Button>
  </React.Fragment>
);

CommentControls.propTypes = {
  colour: PropTypes.string.isRequired,
  openEditor: PropTypes.func.isRequired
};

export default CommentControls;