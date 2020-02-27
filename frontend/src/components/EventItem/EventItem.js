import React from 'react';

// Style
import './EventItem.css';

const eventItem = (props) => {
  return (
    <li key={props.id} className="event__list__item">
      <div>
        <span className="title">{props.title}</span>
        <p className="info">Price: ${props.price}</p>
        <p className="info">
          Date: {new Date(props.date).toLocaleDateString()}
        </p>
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
