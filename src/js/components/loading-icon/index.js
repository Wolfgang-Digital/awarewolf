import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Loaders } from '../../shared';

const Wrapper = styled.div`
  position: fixed;
  right: -10px;
  top: 70px;
  transform: scale(.6);
  z-index: 200;
`;

const LoadingIcon = ({ loading }) => (
  <Wrapper>
    { loading && <Loaders.CircleSpinner /> }
  </Wrapper>
);

LoadingIcon.propTypes = {
  loading: PropTypes.bool
};

export default LoadingIcon;