import React, { Component } from 'react';
import styled, { withTheme, css } from 'styled-components';
import PropTypes from 'prop-types';
import MiniUserBox from '../mini-user-box';
import ReactionBox from '../reaction-box';
import CommentEditor from '../post/CommentEditor';

const MAX_DEPTH = 7;

const Wrapper = styled.div`
  border: ${p => (p.depth > 0 ? 0 : '1px solid')};
  border-left: 2px solid;
  border-color: ${p => (p.secondary ? p.theme.secondary : p.theme.primary)};
  border-radius: 2px;
  margin-bottom: 15px;
  margin-bottom: ${p => p.depth > 0 && 0};
  margin-left: ${p => (p.depth > 0 && p.depth < MAX_DEPTH ? 15 : 0)}px;
  cursor: pointer;
  transition: all .2s ease-out;

  ${p => (p.depth > 0) && css`
    border-left: 2px solid #e0e0e0;
  `};

  &:hover {
    border-left: 2px solid ${p => (p.secondary ? p.theme.secondaryHighlight : p.theme.primaryHighlight)};
    ${p => p.depth >= MAX_DEPTH && 'border: 0'};
  }

  ${p => (p.depth >= MAX_DEPTH) && css`
    border-left: 0;
  `};
`;

const Content = styled.div`
  text-align: left;
  padding: 10px;
  color: #676767;
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px 5px 10px;
  margin-top: -20px;
`;

class CommentListItem extends Component {
  state = {
    showChildren: true,
    editorOpen: false
  };

  toggleEditor = e => {
    if (e) e.stopPropagation();
    this.setState(prev => ({ editorOpen: !prev.editorOpen }));
  };

  toggleChildren = e => {
    if (e) e.stopPropagation();
    this.setState(prev => ({ showChildren: !prev.showChildren }));
  };

  render() {
    const { _id, text, _author, createdAt, _votes, _comments, _rootPost } = this.props.comment;
    const { showChildren, editorOpen } = this.state;
    const { depth } = this.props;

    return (
      <Wrapper
        secondary={this.props.secondary}
        depth={depth}
        onClick={this.toggleChildren}
      >
        <MiniUserBox
          username={_author.username}
          timestamp={createdAt}
          secondary={this.props.secondary}
          avatar={_author.avatar}
        />
        <Content dangerouslySetInnerHTML={{ __html: text }} />
        <ReactionBox
          comments={_comments}
          votes={_votes}
          even={this.props.secondary}
          id={_id}
          isPost={false}
          toggleEditor={this.toggleEditor}
          depth={depth}
        />
        {
          editorOpen &&
          <Editor>
            <CommentEditor
              rootPostId={_rootPost}
              parentId={_id}
              onSend={this.toggleEditor}
              secondary={this.props.secondary}
            />
          </Editor>
        }
        {
          showChildren &&
          _comments.map(c => (
            <CommentListItem
              key={c._id}
              comment={c}
              secondary={this.props.secondary}
              depth={depth + 1}
            />
          ))
        }
      </Wrapper>
    );
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    _author: PropTypes.object.isRequired,
    _rootPost: PropTypes.string.isRequired,
    _parent: PropTypes.string.isRequired,
    _votes: PropTypes.arrayOf(
      PropTypes.shape({
        _user: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })
    ),
    _comments: PropTypes.arrayOf(PropTypes.object)
  }),
  secondary: PropTypes.bool.isRequired,
  depth: PropTypes.number.isRequired
};

export default withTheme(CommentListItem);