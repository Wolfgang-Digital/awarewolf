import React from 'react';
import { GridItem } from 'styled-grid-responsive';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentFilterBar from '../comment-filter-bar';
import { connect } from 'react-redux';
import CommentListItem from './CommentListItem';
import { arrayUtils } from '../../utils';

const mapStateToProps = state => {
  return {
    sortMethod: state.viewState.commentSortMethod
  };
};

const Message = styled.span`
  color: #acacac;
  margin: 20px 0;
`;

const CommentList = ({ comments, sortMethod }) => (
  <React.Fragment>
    {comments.length ? <CommentFilterBar /> : <Message>{`No comments yet...`}</Message>}
      <GridItem col={3 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
        {
          comments.sort(arrayUtils.sortMethods[sortMethod])
            .map((c, i) => (
              <CommentListItem
                key={c._id}
                comment={c}
                secondary={i % 2 === 0}
                depth={0}
              />
            ))
        }
      </GridItem>
  </React.Fragment>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  sortMethod: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(CommentList);