import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;

  > form {
    width: 300px;
    display: flex;
    flex-direction: column;
    > label {
      align-self: flex-start;
      font-size: .8em;
      color: #acacac;
      margin-bottom: 2px;
    }
  }

  @media only screen and (max-device-width: 425px) {
    margin-top: 20px;
  }
`;

export const Title = styled.div`
  color: #acacac;
  font-size: 1.2em;
  font-weight: 300;
  transition: color .3s ease-in-out;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  &:-webkit-autofill {
    box-shadow: inset 0 0 0px 9999px white;
  }
  padding: 5px 10px;
  border-radius: 2px;
  border: 1px solid #7accc8;
  margin-bottom: 10px;
  color: #676767;
`;