import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return { 
    redirectTo: state.viewState.redirectTo
  };
};

const AutoRedirect = ({ redirectTo }) => {
  if (!!redirectTo) {
    return <Redirect to={redirectTo} />
  }
  return null;
};

AutoRedirect.propTypes = {
  redirectTo: PropTypes.string
};

export default connect(mapStateToProps)(AutoRedirect);