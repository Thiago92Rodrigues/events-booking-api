import React from 'react';

// Style
import './BookingControl.css';

const bookingControl = (props) => {
  return (
    <div className='booking__control'>
      <button
        className={props.activeOutputType === 'list' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'list')}
      >
        List
      </button>

      <button
        className={props.activeOutputType === 'chart' ? 'active' : ''}
        onClick={props.onChange.bind(this, 'chart')}
      >
        Chart
      </button>
    </div>
  );
};

export default bookingControl;
