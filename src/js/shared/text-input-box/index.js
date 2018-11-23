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
    padding: 5px;
    border: 1px solid #acacac;
    border-radius: 3px;
    transition: color 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0px 9999px white;
  }

  &::before {
    left: 0;
    right: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid ${p => p.labelColour};
    border-radius: 3px;
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
    border: 1px solid ${p => p.highlightColour};
    border-radius: 3px;
    pointer-events: none;
  }
  &:hover {
    &::before { border-bottom: 1px solid ${p => p.textColour}; }
  }
  &:focus-within {
    &::after { transform: scale(1); }
  }
`;

const TextInputBox = ({ value, type, handleChange, ...rest }) => (
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
  </Wrapper>
);

TextInputBox.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

TextInputBox.defaultProps = {
  width: '100%',
  labelColour: '#acacac',
  textColour: '#676767',
  highlightColour: '#b579f2',
  fontSize: '1em',
  type: 'text'
};

export default TextInputBox;