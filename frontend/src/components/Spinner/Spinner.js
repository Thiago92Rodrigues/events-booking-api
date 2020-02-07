import React from 'react';

// Style
import './Spinner.css';

const spinner = () => {
  return (
    <div className="spinner">
      <div className="lds-dual-ring" />
    </div>
  );
};

export default spinner;
