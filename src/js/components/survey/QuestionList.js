import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { surveyActions, viewActions } from '../../actions';
import Question from './Question';
import PropTypes from 'prop-types';
import { Button } from '../../shared';

const Wrapper = styled.div`
  padding: 10px;
`;

const mapStateToProps = state => {
  return {
    user: state.apiState.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitResponse: (data, id, token) => dispatch(surveyActions.submitResponse(data, id, token)),
    logError: err => dispatch(viewActions.setErrorMessages([err]))
  };
};

class QuestionList extends Component {
  state = {
    answers: []
  };

  componentDidMount() {
    const answers = this.props.questions.map(q => ({ questionId: q.id, text: '', options: [], scaleValue: 0 }));
    this.setState({ answers });
  }

  mapQuestions = () => {
    const { questions } = this.props;
    const { answers } = this.state;
    return questions.map((q, i) => {
      const answer = answers.find(a => a.questionId === q.id);
      return (
        <Question
          key={q.id}
          question={q}
          index={i}
          answer={answer}
          handleTextChange={this.handleTextChange}
          handleSelectOption={this.handleSelectOption}
          handleSelectScale={this.handleSelectScale}
        />
      );
    });
  };

  handleTextChange = (e, id) => {
    const answer = this.state.answers.find(a => a.questionId === id);
    const rest = this.state.answers.filter(a => a.questionId !== id);
    answer.text = e.target.value;
    const answers = [answer, ...rest];
    this.setState({ answers });
  };

  handleSelectOption = (i, id, allowMultiple) => {
    const answer = this.state.answers.find(a => a.questionId === id);
    const rest = this.state.answers.filter(a => a.questionId !== id);

    if (allowMultiple) {
      if (answer.options.includes(i)) {
        answer.options.splice(answer.options.indexOf(i), 1);
      } else {
        answer.options.push(i)
      }
    } else {
      answer.options = [i];
    }

    const answers = [answer, ...rest];
    this.setState({ answers });
  };

  handleSelectScale = (e, id) => {
    const answer = this.state.answers.find(a => a.questionId === id);
    const rest = this.state.answers.filter(a => a.questionId !== id);
    answer.scaleValue = parseInt(e.target.value, 10);
    const answers = [answer, ...rest];
    this.setState({ answers });
  };

  submit = () => {
    const { questions, submitResponse, logError,  id, user } = this.props;
    const { answers } = this.state;

    const valid = questions.reduce((total, next) => {
      if (next.isRequired) {
        if (next.type === 'text' && answers.find(a => a.questionId === next.id).text === '') total.push(false);
        if (next.type === 'multiple' && answers.find(a => a.questionId === next.id).options.length === 0) total.push(false);
      }
      return total;
    }, []).filter(n => n === false).length === 0;

    if (valid) {
      submitResponse({ surveyResponse: answers }, id, user.token);
    } else {
      logError('Please fill in required fields.');
    }
  };

  render() {
    const questions = this.mapQuestions();

    return (
      <Wrapper>
        {questions}
        <Button
          enabled={true}
          style={{
            width: '100%'
          }}
          background={'#e3d1f4'}
          onClick={this.submit}
        >
          Submit
      </Button>
      </Wrapper>
    );
  }
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);