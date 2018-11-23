import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions, viewActions } from '../../actions';
import PropTypes from 'prop-types';
import { Grid, GridItem } from 'styled-grid-responsive';
import { TextEditor, TextInput, Button, Loaders } from '../../shared';
import { Wrapper, TopBar, Title } from './Styles';
import sanitizeHtml from 'sanitize-html';
import { isMobile } from '../../utils';

const MIN_TITLE_LENGTH = 6;
const MIN_CONTENT_LENGTH = 6;

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 2000;

const mapStateToProps = state => {
  return { 
    token: state.apiState.user.token,
    awaitingResponse: state.apiState.awaitingResponse
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    submitPost: (data, token) => dispatch(apiActions.submitPost(data, token)),
    setErrorMessages: messages => dispatch(viewActions.setErrorMessages(messages)) 
  };
};

class CreatePost extends Component {
  state = {
    title: '',
    content: ''
  };

  handleContentChange = content => this.setState({ content });

  handleTitleChange = ({ target: { value }}) => this.setState({ title: value });

  handleSubmit = () => {
    if (this.props.awaitingResponse) return;

    const { title, content } = this.state;
    let errors = [];

    const raw = sanitizeHtml(content, {
      allowedAttributes: [],
      allowedTags: []
    });
    const match = raw.match(/([A-Za-z])/g);

    if (!match || match.length < MIN_CONTENT_LENGTH) errors.push(`Content must contain at least ${MIN_CONTENT_LENGTH} letters.`);

    if (title.length < MIN_TITLE_LENGTH) errors.push(`Title must contain at least ${MIN_TITLE_LENGTH} characters.`);

    if (title.length > MAX_TITLE_LENGTH) errors.push(`Title must contain at most ${MAX_TITLE_LENGTH} characters.`);

    if (match && match.length > MAX_CONTENT_LENGTH) errors.push(`Content must contain at most ${MAX_CONTENT_LENGTH} letters.`);

    if (errors.length > 0) {
      this.props.setErrorMessages(errors);
      return;
    }
    
    const text = sanitizeHtml(content.replace(/<\/p>/g, '<br/>'), {
      allowedTags: sanitizeHtml.defaults.allowedTags.filter(n => n !== 'p').concat([ 'img', 'br' ])
    });
    const { token, submitPost } = this.props;

    submitPost(token, { title: title.trim(), text: text.trim() });
  };

  render() {
    const { title, content } = this.state;
    const { awaitingResponse } = this.props;

    return (
      <Grid center>
        <GridItem col={1}><Title>Post an Idea</Title></GridItem>
        <GridItem col={3/4} media={{ phone: 7 / 8, tablet: 7/8 }}>
          <Wrapper>
            <TopBar>
              <TextInput
                value={title}
                handleChange={this.handleTitleChange}
                label={`Title`}
                fontSize={`1.1em`}
              />
            </TopBar>
            <TextEditor 
              value={content}
              handleEditorChange={this.handleContentChange}
              loader={Loaders.CircleGrid}
              loading={awaitingResponse}
            />
            <Button
              onClick={this.handleSubmit}
              borderRadius={`15px`}
              enabled={!awaitingResponse && content.length >= MIN_CONTENT_LENGTH}
              style={{ 
                width: `200px`,
                margin: `20px ${isMobile() ? 'auto' : '0'} 20px auto`,
                height: `30px`,
                borderRadius: '2px'
              }}
            >
              Submit
            </Button>
          </Wrapper>
        </GridItem>
      </Grid>
    );
  }
}

CreatePost.propTypes = {
  token: PropTypes.string.isRequired,
  submitPost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);