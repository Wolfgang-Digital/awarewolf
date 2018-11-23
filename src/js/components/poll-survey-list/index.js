import React, { Component } from 'react';
import { connect } from 'react-redux';
import { surveyActions } from '../../actions';
import PropTypes from 'prop-types';
import { Grid } from 'styled-grid-responsive';
import { withRouter } from 'react-router-dom';
import { Loaders } from '../../shared';
import styled from 'styled-components';
import { ToTop } from '../../shared';
import { arrayUtils } from '../../utils';
import PollSurveyListItem from '../poll-survey-list-item';
import SurveyFilterBar from '../survey-filter-bar';

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
    surveys: state.pollSurveyState.surveys,
    polls: state.pollSurveyState.polls,
    filterExclude: state.pollSurveyState.filterExclude,
    sortBy: state.pollSurveyState.sortBy,
    pageIndex: state.pollSurveyState.pageIndex,
    resultsPerPage: state.pollSurveyState.resultsPerPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSurveys: token => dispatch(surveyActions.fetchSurveys(token))
  };
};

const filterResults = (result, isPoll, filters, userId) => {
  if (result.isResolved && filters.includes('resolved')) return false;
  if (isPoll && filters.includes('polls')) return false;
  if (!isPoll && filters.includes('surveys')) return false;
  if (!filters.includes('completed') && result.userResponses.includes(userId)) return false;
  return true;
};

class PollSurveyList extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    this.timerId = setTimeout(() => {
      this.setState({ timedOut: true });
      this.timerId = 0;
    }, FETCH_TIMEOUT);

    const { user, fetchSurveys } = this.props;
    fetchSurveys(user.token);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  viewSurvey = (e, id) => {
    if (e.ctrlKey || e.metaKey) {
      window.open(`/surveys/${id}`, '_blank');
    } else if (e.shiftKey) {
      window.open(`/surveys/${id}`);
    } else {
      this.props.history.push(`/surveys/${id}`);
    }
  };

  getVisibleResults = () => {
    const { polls, surveys, sortBy, filterExclude, pageIndex, resultsPerPage, user } = this.props;
    const filteredPolls = polls.filter(p => filterResults(p, true, filterExclude, user.id));
    const filteredSurveys = surveys.filter(s => filterResults(s, false, filterExclude, user.id));

    return filteredPolls.concat(filteredSurveys)
      .sort(arrayUtils.sortMethods[sortBy])
      .slice(pageIndex * resultsPerPage, (pageIndex + 1) * resultsPerPage)
      .map((n, i) => (
        <PollSurveyListItem
          key={n._id}
          secondary={i % 2 === 0}
          item={n}
          userId={user.id}
          open={this.viewSurvey}
        />
      ));
  };

  render() {
    const results = this.getVisibleResults();

    if (!results.length && this.state.timedOut) {
      return (
        <Wrapper>
          <SurveyFilterBar visible={0} />
          <p>No polls or surveys just yet...</p>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <SurveyFilterBar visible={results.length} />
        <Grid>
          { !results.length && <LoaderWrapper><Loaders.CircleGrid /></LoaderWrapper> }
          { results }
        </Grid>
        <ToTop />
      </Wrapper>
    );
  }
}

PollSurveyList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _author: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      questions: PropTypes.array.isRequired,
      isResolved: PropTypes.bool.isRequired
    })
  ),
  fetchSurveys: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PollSurveyList));