import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions, viewActions } from '../../actions';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { TextEditor, Loaders, Button } from '../../shared';
import sanitizeHtml from 'sanitize-html';
import { isMobile } from '../../utils';
import UserAvatar from '../user-avatar';

const MIN_CONTENT_LENGTH = 3;
const MAX_CONTENT_LENGTH = 240;

const MiniUserBox = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  margin: 20px 0 5px 0;

  > span {
    color: #acacac;
    align-self: flex-end;
    margin-left: 5px;
  }
`;

const mapStateToProps = state => {
  return {
    user: state.apiState.user,
    awaitingResponse: state.apiState.awaitingResponse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitComment: (data, token) => dispatch(apiActions.submitComment(data, token)),
    setErrorMessages: messages => dispatch(viewActions.setErrorMessages(messages))
  };
};

class CommentEditor extends Component {
  state = {
    content: ''
  };

  handleChange = content => this.setState({ content });

  handleSubmit = () => {
    if (this.props.awaitingResponse) return;

    const { content } = this.state;
    let errors = [];

    const raw = sanitizeHtml(content, {
      allowedAttributes: [],
      allowedTags: []
    });
    const match = raw.match(/([A-Za-z])/g);

    if (!match || match.length < MIN_CONTENT_LENGTH) errors.push(`Content must contain at least ${MIN_CONTENT_LENGTH} letters.`);

    if (match && match.length > MAX_CONTENT_LENGTH) errors.push(`Content must contain at most ${MAX_CONTENT_LENGTH} letters.`);

    if (errors.length > 0) {
      this.props.setErrorMessages(errors);
      return;
    }
    
    const text = sanitizeHtml(content.replace(/<\/p>/g, '<br/>'), {
      allowedTags: sanitizeHtml.defaults.allowedTags.filter(n => n !== 'p').concat([ 'img', 'br' ])
    });
    const { user, submitComment, rootPostId, parentId } = this.props;

    const data = {
      rootPostId,
      parentId,
      text: text.trim()
    };
    submitComment(data, user.token);
    if (this.props.onSend) this.props.onSend();
  };

  render() {
    const { awaitingResponse, secondary, theme, user } = this.props;

    return (
      <React.Fragment>
        <MiniUserBox>
          <UserAvatar 
            path={user.avatar}
            size='1.5em' 
            colour={secondary ? theme.secondary : theme.primary} 
          />
          <span>{`What are your thoughts?`}</span>
        </MiniUserBox>
        <TextEditor
          value={this.state.content}
          handleEditorChange={this.handleChange}
          loader={Loaders.CircleGrid}
          height={120}
        />
        <Button
          onClick={this.handleSubmit}
          borderRadius={`15px`}
          enabled={!awaitingResponse && this.state.content.length > 2}
          style={{
            width: `200px`,
            margin: `10px 0 10px auto`,
            height: `30px`,
            borderRadius: `2px`,
            float: `${!isMobile() && 'right'}`
          }}
        >
          Submit
        </Button>
        </React.Fragment>
    );
  }
}

CommentEditor.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }),
  submitComment: PropTypes.func.isRequired,
  awaitingResponse: PropTypes.bool.isRequired,
  rootPostId: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  setErrorMessages: PropTypes.func.isRequired
};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(CommentEditor));
