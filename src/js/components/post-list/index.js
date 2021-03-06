import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions, viewActions } from '../../actions';
import PropTypes from 'prop-types';
import PostListItem from './PostListItem';
import { Grid } from 'styled-grid-responsive';
import { withRouter } from 'react-router-dom';
import { Loaders } from '../../shared';
import styled from 'styled-components';
import { ToTop } from '../../shared';
import { arrayUtils } from '../../utils';
import PostFilterBar from '../post-filter-bar';

const FETCH_TIMEOUT = 5000;

const Wrapper = styled.div`
  padding: 20px 5%;

  > p {
    text-align: center;
    color: #acacac;
    margin-top: 20%;
  }
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
    posts: state.apiState.posts,
    sortMethod: state.viewState.postSortMethod,
    filters: state.viewState.postFilters,
    postsPerPage: state.viewState.postsPerPage,
    postPageIndex: state.viewState.postPageIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: token => dispatch(apiActions.fetchPosts(token)),
    setPageIndex: index => dispatch(viewActions.setPostPageIndex(index))
  };
};

const filterPosts = (p, filters) => {
  if (!p.isPinned && !p.isResolved) return true;
  if (filters.includes('pinned') && p.isPinned) return true;
  if (filters.includes('resolved') && p.isResolved) return true;
  return false;
};

class PostList extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    this.timerId = setTimeout(() => {
      this.setState({ timedOut: true });
      this.timerId = 0;
    }, FETCH_TIMEOUT);

    const { user, fetchPosts } = this.props;
    fetchPosts(user.token);

    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  handleKeyPress = e => {
    const { postPageIndex, postsPerPage, setPageIndex } = this.props;

    if (e.ctrlKey || e.metaKey) {
      if ((e.key === 'ArrowLeft') && postPageIndex > 0) {
        setPageIndex(this.props.postPageIndex - 1);
      } else if ((e.key === 'ArrowRight') && (postPageIndex + 1 < this.getTotalVisiblePostCount() / postsPerPage)) {
        setPageIndex(this.props.postPageIndex + 1);
      }
    }
  };

  viewPost = (e, id) => {
    if (e.ctrlKey || e.metaKey) {
      window.open(`/posts/${id}`, '_blank');
    } else if (e.shiftKey) {
      window.open(`/posts/${id}`);
    } else {
      this.props.history.push(`/posts/${id}`);
    }
  };

  getVisiblePosts = () => {
    const { posts, sortMethod, postsPerPage, postPageIndex, filters } = this.props;

    const pinnedPosts = posts.filter(p => p.isPinned).sort(arrayUtils.sortMethods[sortMethod]);
    const otherPosts = posts.filter(p => !p.isPinned).sort(arrayUtils.sortMethods[sortMethod]);

    return pinnedPosts.concat(otherPosts)
      .filter(p => filterPosts(p, filters))
      .slice(postPageIndex * postsPerPage, (postPageIndex + 1) * postsPerPage)
      .map((post, i) => (
        <PostListItem
          key={post._id} 
          post={post} 
          onClick={this.viewPost}
          even={i % 2 === 0}
        />
      ));
  };

  getTotalVisiblePostCount = () => {
    const { posts, filters } = this.props;
    return posts.filter(p => filterPosts(p, filters)).length;
  };

  render() {
    const posts = this.getVisiblePosts();
    const count = this.getTotalVisiblePostCount();

    if (!posts.length && this.state.timedOut) {
      return (
        <Wrapper>
          <p>No posts just yet...</p>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <PostFilterBar visible={count} />
        <Grid>
          { !posts.length && <LoaderWrapper><Loaders.CircleGrid /></LoaderWrapper> }
          { posts }
        </Grid>
        <ToTop />
      </Wrapper>
    )
  }
}

PostList.propTypes = {
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
  fetchPosts: PropTypes.func.isRequired,
  sortMethod: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  postsPerPage: PropTypes.number.isRequired,
  postPageIndex: PropTypes.number.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));