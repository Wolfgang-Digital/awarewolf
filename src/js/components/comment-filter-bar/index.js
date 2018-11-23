import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewActions } from '../../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridItem } from 'styled-grid-responsive';
import { SortByAlpha } from 'styled-icons/material';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const sortOptions = [
  { value: 'byMostRecent', label: 'Newest' },
  { value: 'byLeastRecent', label: 'Oldest' },
  { value: 'byScoreDescending', label: 'Highest Score' },
  { value: 'byCommentsDescending', label: 'Most Comments' },
  { value: 'byLikesDescending', label: 'Most Likes' }
];

const mapStateToProps = state => {
  return {
    sortMethod: state.viewState.commentSortMethod
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSortMethod: sortMethod => dispatch(viewActions.setCommentSortMethod(sortMethod))
  };
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #676767;
  text-align: left;

  * {
    outline: 0;
  }

  .checkbox {
    margin-bottom: 4px;
  }

  .filter-label {
    margin-right: 10px;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  margin-right: 15px;

  svg {
    margin-right: 5px;
    color: #676767;
  }
`;


class CommentFilterBar extends Component {
  render() {
    const { sortMethod, setSortMethod } = this.props;

    return (
      <GridItem col={3/4} media={{ phone: 1, tablet: 3/4 }}>
        <Wrapper>
          <Label>
            <SortByAlpha size={'1.8em'} />Sort:
          </Label>
          <Dropdown
            controlClassName='dropdown-menu'
            options={sortOptions}
            onChange={setSortMethod}
            value={sortMethod}
          />
        </Wrapper>
      </GridItem>
    );
  }
}

CommentFilterBar.propTypes = {
  sortMethod: PropTypes.string.isRequired,
  setSortMethod: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentFilterBar);