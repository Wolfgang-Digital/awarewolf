import React from 'react';
import styled from 'styled-components';
import { TextInputBox } from '../../shared';
import { ErrorOutline } from 'styled-icons/material';
import Tippy from '@tippy.js/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  > span {
    color: #acacac;
    font-size: .8em;
    margin-bottom: 4px;
  }
`;

const SlidingScale = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;

  > h3 {
    margin: 0 0 5px 0;
    font-size: 1em;
  }

  > svg {
    margin-left: auto;
    cursor: pointer;
  }
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > div {
    cursor: pointer;
    margin: 2px 2px 0 auto;
    width: 15px;
    height: 15px;
    border: 1px solid #e3d1f4;
    border-radius: 2px;

    &::after {
      content: '✔';
      font-size: 1em;
      position: relative;
      bottom: 5px;
      color: ${p => p.checked ? '#b579f2' : 'transparent'};
      transition: all .25s ease-in-out;
    }
  }
`;

export default ({ question, answer, index, handleTextChange, handleSelectOption, handleSelectScale }) => {
  const typeString = question.type === 'multiple' ?
    question.allowMultipleAnswers ? '(select multiple)' : '(select one)' :
    '';
  
  const checkedVal = answer ? answer.scaleValue : 0;

  return (
    <Wrapper>
      <span>{`Question ${index + 1} ${typeString}`}</span>
      <Question>
        <h3>{question.text}</h3>
        {
          question.isRequired && 
          <Tippy content={'Required'} arrow={true}>
            <ErrorOutline size={'1.2em'} color={'#b579f2'} />
          </Tippy>
        }
      </Question>
      {
        question.type === 'text' ?
        <TextInputBox
          name={index}
          handleChange={e => handleTextChange(e, question.id)}
          value={answer ? answer.text : ''}
        />
        :
        question.type === 'multiple' ?
        question.options.map((o, i) => (
          <Option 
            key={i} 
            checked={answer && answer.options.includes(i)}
            onClick={() => handleSelectOption(i, question.id, question.allowMultipleAnswers)}
          >
            {o}
            <div />
          </Option>
        ))
        :
        <SlidingScale>
          <span>{ question.scale.minLabel }</span>
          <label>1<input type='radio' value={1} checked={checkedVal === 1} onChange={e => handleSelectScale(e, question.id)} /></label>
          <label>2<input type='radio' value={2} checked={checkedVal === 2} onChange={e => handleSelectScale(e, question.id)} /></label>
          <label>3<input type='radio' value={3} checked={checkedVal === 3} onChange={e => handleSelectScale(e, question.id)} /></label>
          <label>4<input type='radio' value={4} checked={checkedVal === 4} onChange={e => handleSelectScale(e, question.id)} /></label>
          <label>5<input type='radio' value={5} checked={checkedVal === 5} onChange={e => handleSelectScale(e, question.id)} /></label>
          <span>{ question.scale.maxLabel }</span>
        </SlidingScale>
      }
    </Wrapper>
  );
};