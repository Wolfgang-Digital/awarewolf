import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions, viewActions } from '../../actions';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid, GridItem } from 'styled-grid-responsive';
import { Wrapper, Title, Input } from './Styles';
import { Button } from '../../shared';

const mapStateToProps = state => {
  return { loggedIn: state.apiState.loggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmResetPassword: data => dispatch(apiActions.confirmResetPassword(data)),
    setError: msg => dispatch(viewActions.setErrorMessages([msg]))
  };
};

class ResetPassword extends Component {
  state = {
    password: '',
    confirmPassword: ''
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  resetPassword = e => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;

    if (!password || !confirmPassword) {
      this.props.setError('Fields cannot be blank.');
      return;
    }
    if (password !== confirmPassword) {
      this.props.setError('Passwords must match.');
      return;
    }
    this.props.confirmResetPassword({ password, resetToken: this.props.match.params.resetToken });
  };

  render() {
    const { password, confirmPassword } = this.state;
    const { location } = this.props.history;
    const pathname = location.state ? location.state.from.pathname : '/posts';

    return (
      <Grid center>
        {
          this.props.loggedIn &&
          <Redirect
            to={{
              pathname,
              state: { from: '/reset-password' }
            }}
          />
        }
        <GridItem col={3 / 4} media={{ phone: 1, tablet: 3 / 4 }}>
          <Wrapper>
            <Title>
              Reset Password
            </Title>
            <form>
              <label>Password</label>
              <Input
                name='password'
                type='password'
                value={password}
                onChange={this.handleChange}
              />
              <React.Fragment>
                <label>Confirm Password</label>
                <Input
                  name='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
              </React.Fragment>
              <Button
                enabled={true}
                onClick={this.resetPassword}
                type='submit'
              >
                Reset Password
              </Button>
            </form>
          </Wrapper>
        </GridItem>
      </Grid>
    );
  }
};

ResetPassword.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));