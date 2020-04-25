import React from 'react';

// Style
import './BookingList.css';

const bookingList = (props) => (
  <ul className='booking__list'>
    {props.bookings.map((booking) => {
      return (
        <li key={booking._id} className='booking__list__item'>
          <div className='booking__item__data'>
            {booking.event.title} -{' '}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className='booking__item__actions'>
            <button
              className='btn'
              onClick={props.onDelete.bind(this, booking._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default bookingList;
