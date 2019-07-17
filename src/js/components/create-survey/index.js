import React, { Component } from 'react';
import { connect } from 'react-redux';
import { surveyActions, viewActions } from '../../actions';
import PropTypes from 'prop-types';
import { Grid, GridItem } from 'styled-grid-responsive';
import { Wrapper, Header, Body, Break, Summary } from './Styles';
import { TextInput, Button } from '../../shared';
import { Add, DeleteSweep } from 'styled-icons/material';
import Tippy from '@tippy.js/react';
import Question from './Question';
import uuid from 'uuid/v1';
import { validateForm } from './validate';
import api from '../../utils/api';
import Dropdown from '../Dropdown';
import { formatName } from '../../utils';

const mapStateToProps = state => {
  return {
    user: state.apiState.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitSurvey: (data, token) => dispatch(surveyActions.submitSurvey(data, token)),
    setErrorMessages: messages => dispatch(viewActions.setErrorMessages(messages))
  };
};

class CreateSurvey extends Component {
  state = {
    users: [],
    title: '',
    description: '',
    questions: [],
    visibleTo: []
  };

  async componentDidMount() {
    const users = await api.fetchUsers(this.props.user.token);
    if (users.data) {
      this.setState({ users: users.data.map(u => ({ label: formatName(u.username), value: u._id })) });
    }
  }

  handleTitleChange = ({ target: { value }}) => this.setState({ title: value });

  handleDescriptionChange = ({ target: { value }}) => this.setState({ description: value });

  addQuestion = () => {
    const questions = [
      ...this.state.questions,
      { 
        id: uuid(), 
        text: '', 
        type: 'text', 
        options: [],
        allowMultipleAnswers: false,
        isRequired: false,
        scale: {
          min: 1,
          max: 5,
          minLabel: '',
          maxLabel: ''
        }
      }
    ];
    this.setState({ questions });
  };

  editQuestionText = (i, e) => {
    const question = this.state.questions[i];
    question.text = e.target.value;
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions });
  };

  editQuestionType = (i, e) => {
    const question = this.state.questions[i];
    question.type = e.value;
    if (e.value === 'multiple' && question.options.length === 0) {
      question.options.push('');
    }
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions });
  };

  addOption = i => {
    const question = this.state.questions[i];
    question.options.push('');
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions })
  };

  editOption = (questionIndex, optionIndex, e) => {
    const question = this.state.questions[questionIndex];
    question.options[optionIndex] = e.target.value;
    const questions = Object.assign([...this.state.questions], { [questionIndex]: question });
    this.setState({ questions });
  };

  deleteOption = (questionIndex, optionIndex) => {
    const question = this.state.questions[questionIndex];
    question.options.splice(optionIndex, 1);
    const questions = Object.assign([...this.state.questions], { [questionIndex]: question });
    this.setState({ questions });
  };

  toggleRequireQuestion = (i) => {
    const question = this.state.questions[i];
    question.isRequired = !question.isRequired;
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions });
  };

  toggleAllowMultiple = (i) => {
    const question = this.state.questions[i];
    question.allowMultipleAnswers = !question.allowMultipleAnswers;
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions });
  };

  deleteAllQuestions = () => this.setState({ questions: [] });

  deleteAllOptions = i => {
    const question = this.state.questions[i];
    question.options = [];
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions });
  };

  deleteQuestion = id => {
    const questions = this.state.questions.filter(q => q.id !== id);
    this.setState({ questions });
  };

  editScaleLabel = (i, label, value) => {
    const question = this.state.questions[i];
    question.scale[label] = value;
    const questions = Object.assign([...this.state.questions], { [i]: question });
    this.setState({ questions });
  };

  submitSurvey = () => {
    const { title, description, questions, visibleTo } = this.state;
    const errors = validateForm(title, questions);
    if (errors.length > 0) {
      this.props.setErrorMessages(errors);
      return;
    }

    this.props.submitSurvey({
      title,
      description,
      visibleTo,
      questions
    }, this.props.user.token);
  };

  handleDropdown = ({ action, value }) => {
    let visibleTo = this.state.visibleTo;
    if (action === `SELECT`) {
      visibleTo.push(value);
    } else if (action === `REMOVE`) {
      visibleTo = visibleTo.filter(n => n !== value);
    } else if (action === `CLEAR`) {
      visibleTo = [];
    }
    this.setState({ visibleTo });
  };

  render() {
    const { title, description, questions } = this.state;

    return (
      <Grid center>
        <GridItem col={1/2} media={{ phone: 1, tablet: 3/4 }}>
          <Wrapper>
            <Header>Create a Survey</Header>
            <Body>
              <TextInput
                value={title}
                handleChange={this.handleTitleChange}
                label={`Title`}
              />
              <Break />
              <TextInput
                value={description}
                handleChange={this.handleDescriptionChange}
                label={`Description (Optional)`}
              />
              <Dropdown
                placeholder="Only show this survey to selected users (leave empty to show to all)"
                handleChange={this.handleDropdown}
                options={this.state.users}
                isMulti
              />
              <Summary>
                <h3>Questions</h3><span className='m-left'>{`(${questions.length})`}</span>
                <Tippy content={'Delete All Questions'} arrow={true}>
                  <DeleteSweep 
                    size={'1.5em'} 
                    onClick={this.deleteAllQuestions}
                  />
                </Tippy>
                <Tippy content={'Add Question'} arrow={true}>
                  <Add 
                    size={'1.5em'}
                    onClick={this.addQuestion} 
                  />
                </Tippy>
              </Summary>
              { questions.length === 0 && <span>No questions yet...</span> }
              {
                questions.map((q, i) => (
                  <Question
                    key={i}
                    index={i}
                    question={q}
                    editText={this.editQuestionText}
                    deleteQuestion={this.deleteQuestion}
                    editOption={this.editOption}
                    editRequired={this.toggleRequireQuestion}
                    editAllowMultiple={this.toggleAllowMultiple}
                    deleteAllOptions={this.deleteAllOptions}
                    editType={this.editQuestionType}
                    addOption={this.addOption}
                    deleteOption={this.deleteOption}
                    last={i === questions.length - 1}
                    editScaleLabel={this.editScaleLabel}
                  />
                ))
              }
              <Button
                enabled={true}
                onClick={this.submitSurvey}
              >
                Submit Survey
              </Button>
            </Body>
          </Wrapper>
        </GridItem>
      </Grid>
    );
  }
}

CreateSurvey.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }).isRequired,
  submitSurvey: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);