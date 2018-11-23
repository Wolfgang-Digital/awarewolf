import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { apiActions } from '../../actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLinks, NavLink, DesktopTitle, MobileTitle } from './Styles';
import { isMobile, formatName } from '../../utils';
import { Pencil } from 'styled-icons/octicons';
import { ListUl, Info, Question, ChartLine } from 'styled-icons/fa-solid';
import { ExitToApp, Settings } from 'styled-icons/material';
import UserAvatar from '../user-avatar';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

const HEADER_HEIGHT = 80;

const Background = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: #e3d1f4;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
`;

const Nav = styled.div`
  background: linear-gradient(#5CBBB7, #5DA8BC);
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);

  a, a:link, a:visited {
    cursor: pointer;
    text-decoration: none;
    color: white;
  }
`;

const Buffer = styled.div`
  height: ${HEADER_HEIGHT}px;
  width: 100%;
`;

const mapStateToProps = state => {
  return {
    loggedIn: state.apiState.loggedIn,
    user: state.apiState.user
  }
};

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(apiActions.logout()) };
};

class Header extends Component {
  state = {
    dropdownOpen: false
  };

  render() {
    const { user, loggedIn, logout } = this.props;

    return (
      <React.Fragment>
        <Background>
          <Nav>
            <Link to={loggedIn ? '/posts' : '/login'}>
              {
                isMobile() ?
                  <MobileTitle><h1>Awarewolf</h1></MobileTitle> :
                  <DesktopTitle>
                    <h1>Awarewolf</h1>
                    <span>empowering you to make Wolfgang Digital a better organisation</span>
                  </DesktopTitle>
              }
            </Link>
            <NavLinks>
              {
                (loggedIn && user.roles.includes('admin')) &&
                <Link to='/admin'>
                  <Tippy content={'Admin Dashboard'} arrow={true}>
                    <NavLink>
                      <Settings size={'1.2em'} color='white' />
                    </NavLink>
                  </Tippy>
                </Link>
              }
              {
                loggedIn &&
                <React.Fragment>
                  <Link to='/low-down'>
                    <Tippy content={'Code of Conduct'} arrow={true}>
                      <NavLink>
                        <Info size={'1.2em'} color='white' />
                      </NavLink>
                    </Tippy>
                  </Link>
                  <Link to='/surveys'>
                    <Tippy content={'View Surveys'} arrow={true}>
                      <NavLink>
                        <ChartLine size={'1.2em'} color='white' />
                      </NavLink>
                    </Tippy>
                  </Link>
                  <Link to='/posts'>
                    <Tippy content={'View Posts'} arrow={true}>
                      <NavLink>
                        <ListUl size={'1.2em'} color='white' />
                      </NavLink>
                    </Tippy>
                  </Link>
                  <Link to='/create-post'>
                    <Tippy content={'Post an Idea'} arrow={true}>
                      <NavLink>
                        <Pencil size={'1.2em'} color='white' />
                      </NavLink>
                    </Tippy>
                  </Link>
                  {
                    (loggedIn && user.roles.includes('admin')) &&
                    <Link to='/create-survey'>
                      <Tippy content={'Create a Survey'} arrow={true}>
                        <NavLink>
                          <Question size={'1.2em'} color='white' />
                        </NavLink>
                      </Tippy>
                    </Link>
                  }
                  <Tippy content={'Logout'} arrow={true}>
                    <NavLink onClick={logout} style={{ marginLeft: '4px' }}>
                      <ExitToApp size={'1.5em'} color='white' />
                    </NavLink>
                  </Tippy>
                  <Link to='/me'>
                    <Tippy content={'User Profile'} arrow={true}>
                      <NavLink>
                        <span>{formatName(user.username)}</span>
                        <UserAvatar
                          path={user.avatar}
                          colour={'white'}
                          size={'1.8em'}
                        />
                      </NavLink>
                    </Tippy>
                  </Link>
                </React.Fragment>
              }
            </NavLinks>
          </Nav>
        </Background>
        <Buffer />
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
