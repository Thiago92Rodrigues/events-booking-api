import React from 'react';
import { Component } from 'react';

// Components
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import EventList from '../components/EventList/EventList';
import Spinner from '../components/Spinner/Spinner';

// Contexts
import AuthContext from '../context/authContext';

// Style
import './Events.css';

import {
  buildCreateEventRequest,
  buildBookEventRequest,
  buildGetEventsRequest
} from '../utils/queryBuilder';

import {
  sendRequest,
  sendRequestWithAuthentication
} from '../utils/requestsAPI';

class EventsPage extends Component {
  state = {
    creating: false,
    loading: false,
    events: [],
    selectedEvent: null
  };

  is_active = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.title_element = React.createRef();
    this.price_element = React.createRef();
    this.date_element = React.createRef();
    this.description_element = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  componentWillUnmount() {
    this.is_active = false;
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    console.log('CREATE EVENT');

    this.setState({ creating: false });

    const title = this.title_element.current.value;
    const price = +this.price_element.current.value;
    const date = this.date_element.current.value;
    const description = this.description_element.current.value;

    const request_body = buildCreateEventRequest(
      title,
      description,
      price,
      date
    );

    sendRequestWithAuthentication(request_body, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        this.setState((prevState) => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: response.data.createEvent._id,
            title: response.data.createEvent.title,
            description: response.data.createEvent.description,
            date: response.data.createEvent.date,
            price: response.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          });
          return { events: updatedEvents };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  bookEventHandler = () => {
    console.log('BOOK EVENT');

    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }

    const request_body = buildBookEventRequest(this.state.selectedEvent._id);

    sendRequestWithAuthentication(request_body, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        this.setState({ selectedEvent: null });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchEvents = () => {
    console.log('FETCH EVENTS');

    this.setState({ loading: true });

    const request_body = buildGetEventsRequest();

    sendRequest(request_body)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        const events = response.data.events;
        if (this.is_active) this.setState({ events: events, loading: false });
      })
      .catch((error) => {
        console.error(error);
        if (this.is_active) this.setState({ loading: false });
      });
  };

  showDetailHandler = (eventId) => {
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find(
        (event) => event._id === eventId
      );
      return { selectedEvent: selectedEvent };
    });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.selectedEvent) && <Backdrop />}

        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.title_element}></input>
              </div>

              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  ref={this.price_element}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-local"
                  id="date"
                  ref={this.date_element}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.description_element}
                ></textarea>
              </div>
            </form>
          </Modal>
        )}

        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText={this.context.token ? 'Book' : 'Confirm'}
          >
            <span className="price">
              Price: ${this.state.selectedEvent.price}
            </span>
            <span className="date">
              Date:{' '}
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </span>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        )}

        {this.context.token && (
          <div className="event__control">
            <p>Share your own Events</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}

        {this.state.loading ? (
          <Spinner />
        ) : (
          <EventList
            events={this.state.events}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          ></EventList>
        )}
      </React.Fragment>
    );
  }
}

export default EventsPage;
