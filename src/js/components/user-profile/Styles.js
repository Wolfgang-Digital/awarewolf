import styled from 'styled-components';

export const Wrapper = styled.div`
  color: #676767;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 60vh;
  align-items: center;

  > span {
    font-size: .8em;
    color: palevioletred;
    margin-bottom: 5px;
  }

  img {
    width: 100px;
  }
  > h1 {
    margin-bottom: 30px;
  }
  > p {
    line-height: 1em;
    > span {
      font-size: .8em;
    }
  }
`;

export const dropzoneStyle = {
  borderRadius: '50%',
  border: '2px dashed #acacac',
  width: '100px',
  height: '100px',
  margin: '0 auto',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginBottom: '20px'
};

export const acceptStyle = {
  borderRadius: '50%',
  border: '2px solid #7accc8',
  width: '100px',
  height: '100px',
  margin: '0 auto',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginBottom: '20px'
};

export const rejectStyle = {
  borderRadius: '50%',
  border: '2px solid palevioletred',
  width: '100px',
  height: '100px',
  margin: '0 auto',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginBottom: '20px'
};