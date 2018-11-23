import React from 'react';
import './style.css';

export default () => (
  <div className='default-loader-wrapper'>
    <div className='lds-grid'>
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>
);