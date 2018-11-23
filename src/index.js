import React from 'react';
import { render } from 'react-dom';
import App from './js';
import store from './js/reducers';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal, ThemeProvider } from 'styled-components';
import avenir from './fonts/AvenirNextLTPro-Regular.otf';

const theme = {
  primary: '#7accc8',
  secondary: '#e3d1f4',
  primaryHighlight: '#00d19c',
  secondaryHighlight: '#b579f2',
  lightText: '#acacac',
  darkText: '#676767'
};

injectGlobal`
  @font-face {
    font-family: 'AvenirNextLTPro';
    src: url(${avenir}) format('opentype');
    font-weight: 400;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'AvenirNextLTPro';
    overflow-x: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box !important;
  }

  input:-webkit-autofill {
    background-color: bisque;
  }
`;

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
