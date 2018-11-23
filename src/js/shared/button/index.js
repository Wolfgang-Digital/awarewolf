import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.button`
  outline: 0;
  cursor: pointer;
  background: ${p => p.background};
  color: ${p => p.colour};
  font-size: ${p => p.fontSize};
  border: 1px solid ${p => p.background};
  border-radius: ${p => p.borderRadius};
  padding: ${p => p.padding};
  transition: all .3s ease-in-out;
  letter-spacing: .05em;
  ${p => !p.enabled && `filter: grayscale(100)`};

  svg {
    margin-right: 4px;
    transition: color .3s ease-in-out;
  }

  &:hover {
    ${p => p.enabled && css`
      background: ${p => p.colour};
      color: ${p => p.background};
      svg {
        color: ${p => p.background};
      }
    `};
  }
`;

const Button = ({ children, ...rest }) => (
  <Wrapper {...rest}>
    {children}
  </Wrapper>
);

Button.defaultProps = {
  background: '#7accc8',
  colour: '#ffffff',
  fontSize: '1em',
  borderRadius: '2px',
  padding: '6px 12px 4px 12px'
};

export default Button;