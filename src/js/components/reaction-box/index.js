import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import { Wrapper, Comments, Votes, Icon } from './Styles';
import { CommentAlt } from 'styled-icons/fa-solid';
import { ThumbDown, ThumbUp } from 'styled-icons/material';
import { arrayUtils } from '../../utils';
import { withTheme } from 'styled-components';
import AdminControls from './AdminControls';
import { Button } from '../../shared';

const MAX_DEPTH = 7;

const stopProp = e => e.stopPropagation();

const mapStateToProps = state => {
  return {
    user: state.apiState.user,
    awaitingResponse: state.apiState.awaitingResponse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitVote: (data, token) => dispatch(apiActions.submitVote(data, token))
  };
};

const ReactionBox = ({
  submitVote,
  user,
  comments,
  votes,
  theme,
  even,
  isPost,
  id,
  awaitingResponse,
  isResolved,
  isPinned,
  toggleEditor,
  depth,
  ...rest
}) => {
  const parsedVotes = arrayUtils.countVotesWithUser(votes, user.id);

  const likeBackground =
    even ?
      parsedVotes.user === 1 ? theme.secondaryHighlight : theme.secondary
      :
      parsedVotes.user === 1 ? theme.primaryHighlight : theme.primary;

  const dislikeBackground =
    even ?
      parsedVotes.user === -1 ? theme.secondaryHighlight : theme.secondary
      :
      parsedVotes.user === -1 ? theme.primaryHighlight : theme.primary;

  const isAdmin = user.roles.includes('admin');
  const onReplyClick = depth < MAX_DEPTH - 1? toggleEditor : stopProp;
 
  return (
    <Wrapper {...rest}>
      <Comments
        colour={even ? theme.darkText : 'white'}
        background={even ? theme.secondary : theme.primary}
      >
        {`${arrayUtils.countChildren(comments)} ${arrayUtils.countChildren(comments) === 1 ? 'Comment' : 'Comments'}`}
      </Comments>
      { isPost && <AdminControls 
        isAdmin={isAdmin}
        isPinned={isPinned}
        isResolved={isResolved}
        even={even}
        theme={theme}
        id={id}
      /> }
      {
        (!isPost && MAX_DEPTH > 0) && 
          <Button
            enabled={depth < MAX_DEPTH - 1}
            background={even ? theme.secondary : theme.primary}
            onClick={onReplyClick}
            style={{
              fontSize: '.8em',
              borderRadius: '16px',
              fontWeight: '300',
              padding: '5px 10px',
              marginLeft: '10px'
            }}
          >
            <CommentAlt size={'1em'} color={'white'} />
            Reply
          </Button>
      }
      <Votes>
        <Icon
          onClick={e => e.stopPropagation() & submitVote({ value: 1, id, isPost }, user.token)}
          background={likeBackground}
          awaitingResponse={awaitingResponse}
        >
          <ThumbUp size={'1em'} />
        </Icon>
        {parsedVotes.up}
        <Icon
          onClick={e => e.stopPropagation() & submitVote({ value: -1, id, isPost }, user.token)}
          background={dislikeBackground}
          awaitingResponse={awaitingResponse}
        >
          <ThumbDown size={'1em'} />
        </Icon>
        {parsedVotes.down}
      </Votes>
    </Wrapper>
  );
};

ReactionBox.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  awaitingResponse: PropTypes.bool.isRequired,
  submitVote: PropTypes.func.isRequired,
  isResolved: PropTypes.bool,
  isPinned: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.object),
  votes: PropTypes.arrayOf(
    PropTypes.shape({
      _user: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    primaryHighlight: PropTypes.string.isRequired,
    secondaryHighlight: PropTypes.string.isRequired
  }),
  even: PropTypes.bool.isRequired,
  isPost: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(ReactionBox));