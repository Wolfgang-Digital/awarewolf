import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: ${p => p.fontSize};
  width: ${p => p.width};

  > input {
    color: ${p => p.textColour};
    font-size: ${p => p.fontSize};
    font-weight: 400;
    outline: 0;
    padding: 2px;
    border: 0;
    transition: color 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    
    &:focus + label {
      color: ${p => p.highlightColour};
      transform: translate(0, -1.3em) scale(0.8);
    }
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0px 9999px white;
  }

  > label {
    text-align: left;
    position: absolute;
    bottom: 2px;
    color: ${p => p.labelColour};
    transition: transform 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    ${p => p.notEmpty && 'transform: translate(0, -1.3em) scale(0.8)'};
    transform-origin: top left;
    pointer-events: none;
  }

  &::before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid ${p => p.labelColour};
    pointer-events: none;
  }
  &::after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    transform: scaleX(0);
    transition: transform 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    border-bottom: 2px solid ${p => p.highlightColour};
    pointer-events: none;
  }
  &:hover {
    &::before { border-bottom: 2px solid ${p => p.textColour}; }
  }
  &:focus-within {
    &::after { transform: scale(1); }
  }
`;

const TextInput = ({ value, type, handleChange, label, ...rest }) => (
  <Wrapper 
    notEmpty={!!value}
    {...rest}
  >
    <input
      type={type}
      value={value}
      onChange={handleChange}
      data-lpignore="true"
      autoComplete='false'
    />
    <label>{ label }</label>
  </Wrapper>
);

TextInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

TextInput.defaultProps = {
  width: '100%',
  labelColour: '#acacac',
  textColour: '#676767',
  highlightColour: '#5DADBB',
  fontSize: '1em',
  type: 'text'
};

export default TextInput;