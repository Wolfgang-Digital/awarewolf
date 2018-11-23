import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const Comments = styled.div`
  border-radius: 16px;
  background: ${p => p.background};
  color: ${p => p.colour};
  font-size: .8em;
  font-weight: 300;
  padding: 5px 10px;
`;

export const Votes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-left: auto;
  font-size: .8em;
  color: #676767;
`;

export const Icon = styled.div`
  cursor: ${p => (p.awaitingResponse ? 'progress' : 'pointer')};
  border-radius: 50%;
  background: ${p => p.background};
  border: 1px solid ${p => p.background};
  transition: all .3s ease-in-out;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 0 10px;

  > svg {
    transition: all .3s ease-in-out;
    color: white;
  }

  &:hover {
    background: white;
    > svg {
      color: ${p => p.background};
    }
  }
`;

export const AdminIcon = styled.div`
  padding: ${p => p.padding || '4px 6px 0 8px'};
  outline: 0;
  cursor: pointer;

  > * {
    outline: 0;
  }

  svg {
    transition: all .3s ease-out;
    color: ${p => p.colour};
  }

  &:hover {
    svg {
      color: ${p => p.highlight};
    }
  }
`;