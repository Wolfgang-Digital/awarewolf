import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import DefaultLoader from './DefaultLoader';

class ProtectedRoute extends Component {
  state = {
    timedOut: false
  };

  componentDidMount() {
    if (this.props.timeout) {
      this.timerId = setTimeout(() => {
        this.setState({ timedOut: true });
        this.timerId = 0;
      }, this.props.timeout);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  render() {
    const { component: Component, redirectPath, authorised = false, timeout, loader, ...rest } = this.props;

    if (!authorised && timeout && !this.state.timedOut) return this.props.loader || <DefaultLoader />;

    return (
      <Route
        {...rest}
        render={props =>
          authorised ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: redirectPath,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired,
  authorised: PropTypes.bool,
  timeout: PropTypes.number,
  loader: PropTypes.func
};

export default ProtectedRoute;