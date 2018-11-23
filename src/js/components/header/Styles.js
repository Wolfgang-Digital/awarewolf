import styled from 'styled-components';

export const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const NavLink = styled.div`
  margin-left: 10px;
  cursor: pointer;
  color: white;
  border: 1px solid transparent;
  transition: .3s all ease-in-out;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;

  > div {
    margin-left: 10px;
  }
  > div:last-of-type {
    margin-left: 0;
  }

  &:hover {
    border-color: white;
  }

  > span {
    margin-right: 5px;
  }
`;

export const DesktopTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;

  > h1 {
    font-weight: lighter;
    font-size: 2em;
    letter-spacing: .2em;
    text-transform: uppercase;
  }
  > span {
    margin-top: 10px;
    font-weight: lighter;
    font-size: .9em;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export const MobileTitle = styled.div`
  display: none;
`;