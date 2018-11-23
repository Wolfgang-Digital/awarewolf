import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px 0 40px 0;
  box-shadow: 1px 2px rgba(0,0,0,0.2);
  border-radius: 3px;
  border: 1px solid #7accc8;

  @media only screen and (max-device-width: 425px) {
    margin: 20px 10px;
  }
`;

export const Header = styled.div`
  border-radius: 3px 3px 0 0;
  padding: 10px;
  text-align: center;
  background: #7accc8;
  color: #fff;
  font-size: 1.5em;
  letter-spacing: .05em;
`;

export const Body = styled.div`
  padding: 50px 30px 20px 30px;
  display: flex;
  flex-direction: column;

  > span {
    text-align: center;
    font-size: .9em;
    color: #acacac;
    margin-bottom: 20px;
  }

  @media only screen and (max-device-width: 425px) {
    padding: 50px 10px 10px 10px;
  }
`;

export const Break = styled.div`
  margin-bottom: ${p => p.size || 40}px;
`;

export const QuestionWrapper  = styled.div`
  border-top: 2px solid #7accc8;
  border-bottom: ${p => p.last && '2px solid #7accc8'};
  margin: 0 -30px;
  margin-bottom: ${p => p.last && '20px'};
  color: #676767;
  padding: 10px 30px 20px 30px;

  .Dropdown-arrow {
    right: 0 !important;
  }

  @media only screen and (max-device-width: 425px) {
    margin: 0 -10px;
    margin-bottom: ${p => p.last && '20px'};
    padding: 20px 10px;
  }
`;

export const Summary = styled.div`
  display: flex;
  margin: ${p => p.margin || '50px 0 15px 0'};
  flex-direction: row;
  align-items: baseline;
  color: #676767;

  > h3 {
    margin: 0;
  }
  > svg { 
    cursor: pointer;
    color: #676767;
    align-self: center;
    justify-self: flex-end;
    margin-left: 15px;
    outline: 0;

    &:hover {
      color: #7accc8;
    }
  }
  > svg:first-of-type {
    margin-left: auto;
  }
  .m-left {
    margin-left: 10px;
    color: #acacac;
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  flex-shrink: 1;
  flex-wrap: wrap;

  * {
    text-align: left;
  }
  span {
    margin-right: 10px;
  }
  svg { 
    cursor: pointer;
    color: #676767;
    outline: 0;

    &:hover {
      color: #7accc8;
    }

    @media only screen and (max-device-width: 425px) {
      margin-top: 10px;
    }
  }
  .lift {
    margin-bottom: 4px;
    margin-right: 10px;

    @media only screen and (max-device-width: 425px) {
      margin-bottom: -4px;
      margin-right: auto;
    }
  }
  .required {
    margin-left: auto;

    @media only screen and (max-device-width: 425px) {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

export const Option = styled.div`
  margin: 30px 0 10px 0;
  display: flex;
  flex-direction: row;

  svg {
    cursor: pointer;
    margin-left: auto;

    &:hover {
      color: #7accc8;
    }
  }
`;

export const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 1.5em;

  svg {
    color: palevioletred;
    width: 1.5em;
    margin-left: auto;
    cursor: pointer;
  }
`;

export const ScaleLabels = styled.div`
  margin: 25px 0;
  > div:nth-child(1) {
    margin-bottom: 25px;
  }
`;