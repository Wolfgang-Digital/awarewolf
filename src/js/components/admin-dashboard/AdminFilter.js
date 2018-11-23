import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewActions } from '../../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridItem } from 'styled-grid-responsive';
import { SortByAlpha, FilterList } from 'styled-icons/material';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './style.css';
import Tippy from '@tippy.js/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'styled-icons/material';

const sortOptions = [
  { value: 'byMostRecent', label: 'Newest' },
  { value: 'byLeastRecent', label: 'Oldest' },
  { value: 'byScoreDescending', label: 'Highest Score' },
  { value: 'byCommentsDescending', label: 'Most Comments' },
  { value: 'byLikesDescending', label: 'Most Likes' }
];

const POSTS_PER_PAGE = 50;

const mapStateToProps = state => {
  return {
    pageIndex: state.viewState.postPageIndex,
    sortMethod: state.viewState.postSortMethod,
    filters: state.viewState.postFilters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSortMethod: sortMethod => dispatch(viewActions.setPostSortMethod(sortMethod)),
    toggleFilter: filter => dispatch(viewActions.toggleFilter(filter)),
    setPostPageIndex: index => dispatch(viewActions.setPostPageIndex(index))
  };
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #676767;
  height: 30px;
  margin: 15px 0;
  font-size: .9em;
  * {
    outline: 0;
    text-align: left;
  }
  .checkbox {
    margin-bottom: 6px;
  }
  .filter-label {
    margin-right: 10px;
  }
  .buttons {
    display: flex;
    align-items: center;
    margin-left: auto;
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

const PageButton = styled.div`
  cursor: pointer;
  color: #acacac;
  display: flex;
  align-items: center;
  padding-top: 4px;
  margin-left: ${p => p.left}px;
  margin-bottom: 2px;

  &:hover {
    color: #7accc8;
  }
  > svg {
    margin-top: 2px;
  }
`;

const getPaginationText = (index, total) => {
  if (total === 0) return '';
  const num = total < POSTS_PER_PAGE * (index + 1) ? total : POSTS_PER_PAGE * (index + 1);
  return `Showing ${index * POSTS_PER_PAGE + 1} - ${num} of ${total} posts.`
};


class AdminFilter extends Component {
  handleFilterChange = filter => {
    this.props.toggleFilter(filter);
  };

  handlePageChange = index => {
    this.props.setPostPageIndex(index);
  };

  shouldShowNextButton = () => {
    const { visible, pageIndex } = this.props;
    return pageIndex + 1 < visible / POSTS_PER_PAGE;
  };

  render() {
    const { sortMethod, setSortMethod, filters, visible, pageIndex, setPostPageIndex } = this.props;
    const showPinned = filters.includes('pinned');
    const showResolved = filters.includes('resolved');

    return (
      <React.Fragment>
        <GridItem col={1 / 4} media={{ phone: 1, tablet: 3/4 }}>
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
        <GridItem col={1 / 4} media={{ phone: 1, tablet: 3/4 }}>
          <Wrapper>
            <Label>
              <FilterList size={'1.8em'} />Filter:
          </Label>
            <span className='filter-label'>Pinned</span>
            <Tippy content={showPinned ? 'Hide pinned posts' : 'Show pinned posts'} delay={[300, 30]} arrow={true}>
              <div>
                <label htmlFor="cbx" className="label-cbx">
                  <input id="cbx" type="checkbox" className="invisible" checked={showPinned} onChange={() => this.handleFilterChange('pinned')} />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                </label>
              </div>
            </Tippy>
            <span className='filter-label'>Resolved</span>
            <Tippy content={showResolved ? 'Hide resolved posts' : 'Show resolved posts'} delay={[300, 30]} arrow={true}>
              <div>
                <label htmlFor="cbx2" className="label-cbx">
                  <input id="cbx2" type="checkbox" className="invisible" checked={showResolved} onChange={() => this.handleFilterChange('resolved')} />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                </label>
              </div>
            </Tippy>
          </Wrapper>
        </GridItem>
        <GridItem col={1 / 4} media={{ phone: 1, tablet: 3/4 }}>
          <Wrapper right>
            {getPaginationText(pageIndex, visible)}
            <div className='buttons'>
              {
                pageIndex > 0 &&
                <PageButton
                  onClick={() => setPostPageIndex(pageIndex - 1)}
                >
                  <KeyboardArrowLeft size={'1.8em'} />
                  Previous
                </PageButton>
              }
              {
                this.shouldShowNextButton() &&
                <PageButton
                  left={15}
                  onClick={() => setPostPageIndex(pageIndex + 1)}
                >
                  Next
                  <KeyboardArrowRight size={'1.8em'} />
                </PageButton>
              }
            </div>
          </Wrapper>
        </GridItem>
      </React.Fragment>
    );
  }
}

AdminFilter.propTypes = {
  sortMethod: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string),
  setSortMethod: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminFilter);