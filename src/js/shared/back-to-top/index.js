import React from 'react';
import { ArrowUp } from 'styled-icons/octicons';
import styled from 'styled-components';

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Wrapper = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
  border-radius: 50%;
  background: #7accc8;
  border: 1px solid #7accc8;
  transition: all .3s ease-in-out;
  max-width: 50px;
  max-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    transition: all .3s ease-in-out;
    fill: white;
  }

  &:hover {
    background: white;
    > svg {
      fill: #7accc8;
    }
  }
`;

export default () => (
  <Wrapper onClick={() => toTop()}>
    <ArrowUp size={32} />
  </Wrapper>
);