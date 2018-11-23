import React, { Component } from 'react';
import { connect } from 'react-redux';
import { surveyActions } from '../../actions';
import PropTypes from 'prop-types';
import { Grid, GridItem } from 'styled-grid-responsive';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Loaders } from '../../shared';
import { ToTop } from '../../shared';
import Main from './Main';

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
    surveys: state.pollSurveyState.surveys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSurveyById: (id, token) => dispatch(surveyActions.fetchSurveyById(id, token))
  };
};

class Survey extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.timerId = setTimeout(() => {
      this.setState({ timedOut: true });
      this.timerId = 0;
    }, FETCH_TIMEOUT);

    const { user, surveys, match } = this.props;
    if (!surveys.length) {
      this.props.fetchSurveyById(match.params.surveyId, user.token);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  getSurveyComponent = survey => {
    return (
      <GridItem col={2 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
        <Main
          id={survey._id}
          author={survey._author}
          title={survey.title}
          description={survey.description}
          createdAt={survey.createdAt}
          questions={survey.questions}
        />
      </GridItem>
    )
  };

  render() {
    const { surveys, match } = this.props;
    const { timedOut } = this.state;
    const survey = surveys.find(s => s._id === match.params.surveyId);

    return (
      <Wrapper>
        <Grid center>
          {
            survey ?
            this.getSurveyComponent(survey)
            :
            timedOut ?
            <p>{`Could not find survey ID: ${match.params.surveyId}`}</p>
            :
            <LoaderWrapper>
              <Loaders.CircleGrid />
            </LoaderWrapper>
          }
        </Grid>
        <ToTop />
      </Wrapper>
    );
  }
}

Survey.propTypes = {
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
      questions: PropTypes.arrayOf(PropTypes.object)
    })
  )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Survey));