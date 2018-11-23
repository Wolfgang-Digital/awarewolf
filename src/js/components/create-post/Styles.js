import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  li {
   list-style-type: none; 
  }
`;

export const TopBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
  align-items: baseline;
  
  & > *:first-child {
    margin-right: auto;
  }
`;

export const Title = styled.h1`
  color: #676767;
  margin: 5% 0 30px 0;
`;