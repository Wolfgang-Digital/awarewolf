import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import PropTypes from 'prop-types';
import { Grid, GridItem } from 'styled-grid-responsive';
import { withRouter } from 'react-router-dom';
import PostItem from './PostItem'
import styled from 'styled-components';
import { Loaders } from '../../shared';
import CommentEditor from './CommentEditor';
import CommentList from '../comment-list';
import { ToTop } from '../../shared';

const FETCH_TIMEOUT = 5000;

const Wrapper = styled.div`
  padding: 20px 5%;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const mapStateToProps = state => {
  return {
    user: state.apiState.user,
    posts: state.apiState.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPostById: (postId, token) => dispatch(apiActions.fetchPostById(postId, token))
  };
};

class Post extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    window.scrollTo(0,0);

    this.timerId = setTimeout(() => {
      this.setState({ timedOut: true });
      this.timerId = 0;
    }, FETCH_TIMEOUT);

    const { user, posts, match } = this.props;
    if (!posts.length) {
      this.props.fetchPostById(match.params.postId, user.token);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  render() {
    const { posts, match } = this.props;
    const post = posts.find(p => p._id === match.params.postId);

    return (
      <Wrapper>
        <Grid center>
          {
            post ?
              <PostItem post={post} /> :
              this.state.timedOut ?
                <p>{`Could not find post ID: ${match.params.postId}`}</p> :
                <LoaderWrapper><Loaders.CircleGrid /></LoaderWrapper>
          }
          {
            post &&
            <GridItem col={3 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
              <CommentEditor
                rootPostId={post._id}
                parentId={post._id}
              />
            </GridItem>
          }
        {post && <CommentList comments={post._comments} />}
        </Grid>
        <ToTop />
      </Wrapper>
    );
  }
}

Post.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _author: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      _comments: PropTypes.array,
      _votes: PropTypes.array,
      isResolved: PropTypes.bool.isRequired
    })
  ),
  fetchPostById: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));