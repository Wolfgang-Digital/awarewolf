import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../shared';
import { QuestionWrapper, Controls, Option, Summary, ErrorBox, ScaleLabels } from './Styles';
import Dropdown from 'react-dropdown';
import { Delete, Add, DeleteSweep } from 'styled-icons/material';
import Tippy from '@tippy.js/react';
import { validateQuestion } from './validate';
import { ErrorOutline } from 'styled-icons/material';

const typeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'multiple', label: 'Multiple Choice' },
  { value: 'scale', label: 'Sliding Scale' }
];

const Question = ({
  index,
  question,
  last,
  editText,
  editType,
  editRequired,
  editAllowMultiple,
  deleteQuestion,
  addOption,
  editOption,
  deleteOption,
  deleteAllOptions,
  editScaleLabel
}) => {
  const { id, text, type, options, allowMultipleAnswers, isRequired, scale } = question;
  const errors = validateQuestion(question);

  return (
    <QuestionWrapper last={last}>
      <ErrorBox>
        {
          errors.length > 0 &&
          <Tippy content={errors[0]} arrow={true}>
            <ErrorOutline />
          </Tippy>
        }
      </ErrorBox>
      <TextInput
        value={text}
        handleChange={e => editText(index, e)}
        label={`Question ${index + 1}`}
      />
      <Controls>
        <span>Answer Type:</span>
        <Dropdown
          controlClassName='dropdown-menu'
          options={typeOptions}
          onChange={e => editType(index, e)}
          value={type}
        />
        {
          type === 'multiple' &&
          <React.Fragment>
          <span className='required'>Multiple answers:</span>
          <div className='lift'>
            <label htmlFor={`cbox-${id}-am`} className="label-cbx">
              <input id={`cbox-${id}-am`} type="checkbox" className="invisible" checked={allowMultipleAnswers} onChange={() => editAllowMultiple(index)} />
              <div className="checkbox">
                <svg width="20px" height="20px" viewBox="0 0 20 20">
                  <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                  <polyline points="4 11 8 15 16 6"></polyline>
                </svg>
              </div>
            </label>
          </div>
          </React.Fragment>
        }
        <span className='required'>Required:</span>
        <div className='lift'>
          <label htmlFor={`cbox-${id}`} className="label-cbx">
            <input id={`cbox-${id}`} type="checkbox" className="invisible" checked={isRequired} onChange={() => editRequired(index)} />
            <div className="checkbox">
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                <polyline points="4 11 8 15 16 6"></polyline>
              </svg>
            </div>
          </label>
        </div>
        <Tippy content={'Delete Question'} arrow={true}>
          <Delete
            size={'1.5em'}
            onClick={() => deleteQuestion(id)}
          />
        </Tippy>
      </Controls>
      {
        type === 'multiple' &&
        <Summary margin={'20px 0 0 0'}>
          <strong>Options</strong><span className='m-left'>{`(${options.length})`}</span>
          <Tippy content={'Delete All Options'} arrow={true}>
            <DeleteSweep
              size={'1.5em'}
              onClick={() => deleteAllOptions(index)}
            />
          </Tippy>
          <Tippy content={'Add Option'} arrow={true}>
            <Add
              size={'1.5em'}
              onClick={() => addOption(index)}
            />
          </Tippy>
        </Summary>
      }
      {
        type === 'multiple' &&
        options.map((o, i) => (
          <Option key={i}>
            <TextInput
              value={o}
              handleChange={e => editOption(index, i, e)}
              label={`Option ${i + 1}`}
              style={{ width: '95%' }}
            />
            <Tippy content={'Delete Option'} arrow={true}>
              <Delete
                size={'1.5em'}
                onClick={() => deleteOption(index, i)}
              />
            </Tippy>
          </Option>
        ))
      }
      {
        type === 'scale' &&
        <ScaleLabels>
          <TextInput
            value={scale.minLabel}
            handleChange={e => editScaleLabel(index, 'minLabel', e.target.value)}
            label={`${scale.min}. Label (optional)`}
          />
          <TextInput
            value={scale.maxLabel}
            handleChange={e => editScaleLabel(index, 'maxLabel', e.target.value)}
            label={`${scale.max}. Label (optional)`}
          />
        </ScaleLabels>
      }
    </QuestionWrapper>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    isRequired: PropTypes.bool.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired,
  editText: PropTypes.func.isRequired,
  editType: PropTypes.func.isRequired,
  editRequired: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  editOption: PropTypes.func.isRequired,
  deleteAllOptions: PropTypes.func.isRequired,
};

export default Question;