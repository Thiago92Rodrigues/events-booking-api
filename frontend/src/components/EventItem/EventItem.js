import React from 'react';

// Style
import './EventItem.css';

const eventItem = (props) => {
  return (
    <li key={props.id} className="event__list__item">
      <div>
        <h1>{props.title}</h1>
        <h2>
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {props.userId === props.creatorId ? (
          <p>Your the owner of this event.</p>
        ) : (
          <button className="btn" onClick={props.onDetail.bind(this, props.id)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default eventItem;
