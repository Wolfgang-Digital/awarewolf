import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const handleMultiSelect = ({ action, option, removedValue }, handleChange) => {
  if (action === `select-option`) {
    console.log(option)
    handleChange({ action: `SELECT`, value: option.value });
  } else if (action === `remove-value`) {
    handleChange({ action: `REMOVE`, value: removedValue.value });
  } else if (action === `clear`) {
    handleChange({ action: `CLEAR` });
  }
};

const handleSelect = ({ action }, option, handleChange) => {
  if (action === `select-option`) {
    handleChange(option.value);
  } else if (action === `clear`) {
    handleChange(null);
  }
};

const Dropdown = styled(Select)`
  font-size: 0.8em;
  width: ${({ width }) => width};
  min-width: 150px;
  background: white;
  text-align: left;
  margin-top: 32px;
`;

export default ({ handleChange, defaultValue, width, isMulti, ...rest }) => (
  <Dropdown
    {...rest}
    isMulti={isMulti}
    width={width}
    defaultValue={defaultValue}
    onChange={isMulti ?
      (options, action) => handleMultiSelect(action, handleChange) :
      (option, action) => handleSelect(action, option, handleChange)
    }
    theme={theme => ({
      ...theme,
      borderRadius: 2,
      colors: {
        ...theme.colors,
        primary: `#00ccbc`,    // Selected Option
        primary25: `#00c2b3`,  // Hovered Option
        neutral80: `#4a5661`,  // Selected Text
      }
    })}
  />
);