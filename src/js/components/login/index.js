import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions, viewActions } from '../../actions';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid, GridItem } from 'styled-grid-responsive';
import { Wrapper, Title, Switch, Input } from './Styles';
import { Button } from '../../shared';

const mapStateToProps = state => {
  return { loggedIn: state.apiState.loggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(apiActions.login({ email, password })),
    signup: data => dispatch(apiActions.signup(data)),
    setError: msg => dispatch(viewActions.setErrorMessages([msg])),
    requestReset: email => dispatch(apiActions.requestResetPassword(email))
  };
};

class LoginContainer extends Component {
  state = {
    isLogin: true,
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  login = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password)
  };

  signup = e => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    
    if (!email || !password || !confirmPassword) {
      this.props.setError('Fields cannot be blank.');
      return;
    }
    if (password !== confirmPassword) {
      this.props.setError('Passwords must match.');
      return;
    }

    this.props.signup({ email, password });
  };

  toggleLogin = () => this.setState(prev => ({ isLogin: !prev.isLogin }));

  requestPasswordReset = () => {
    this.props.requestReset(this.state.email);
  };

  render() {
    const { email, password, confirmPassword, isLogin } = this.state;
    const { location } = this.props.history;
    const pathname = location.state ? location.state.from.pathname : '/posts';

    return (
      <Grid center>
        {
          this.props.loggedIn &&
          <Redirect
              to={{
                pathname,
                state: { from: '/login' }
              }}
            />
        }
        <GridItem col={3/4} media={{ phone: 1, tablet: 3/4 }}>
          <Wrapper>
            <Title>
              { isLogin ? 'Login' : 'Signup' }
            </Title>
            <form>
              <label>Email</label>
              <Input
                name='email'
                type='text'
                value={email}
                onChange={this.handleChange}
              />
              <label>Password</label>
              <Input
                name='password'
                type='password'
                value={password}
                onChange={this.handleChange}
              />
              {
                !isLogin &&
                <React.Fragment>
                  <label>Confirm Password</label>
                  <Input
                    name='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={this.handleChange}
                  />
                </React.Fragment>
              }
              {
                isLogin ?
                <Button
                  enabled={true}
                  type='submit'
                  onClick={this.login}
                >
                  Login
                </Button>
                :
                <Button
                  enabled={true}
                  onClick={this.signup}
                  type='submit'
                >
                  Signup
                </Button>
              }
            </form>
            <Switch onClick={this.toggleLogin}>
              { isLogin ? 'Sign up instead' : 'Login instead' }
            </Switch>
            <Switch onClick={this.requestPasswordReset}>
              Reset password
            </Switch>
          </Wrapper>
        </GridItem>
      </Grid>
    );
  }
};

LoginContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));