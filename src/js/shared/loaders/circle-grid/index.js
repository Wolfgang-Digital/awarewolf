import React from 'react';
import './style.css';

export default () => (
  <div className='positioned-loader-wrapper'>
    <div className='lds-grid'>
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>
);