import React from 'react';
import { Component } from 'react';

// Components
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import EventList from '../components/EventList/EventList';
import Spinner from '../components/Spinner/Spinner';

// Context
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
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
      creatingEvent: false,
      events: [],
      selectedEvent: null
    };

    this.isPageActive = true;

    this.titleElement = React.createRef();
    this.priceElement = React.createRef();
    this.dateElement = React.createRef();
    this.descriptionElement = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  componentWillUnmount() {
    this.isPageActive = false;
  }

  startCreateEventHandler = () => {
    this.setState({ creatingEvent: true });
  };

  createEventConfirmHandler = () => {
    console.log('CREATE EVENT');

    this.setState({ creatingEvent: false });

    const title = this.titleElement.current.value;
    const price = +this.priceElement.current.value;
    const date = this.dateElement.current.value;
    const description = this.descriptionElement.current.value;

    const requestBody = buildCreateEventRequest(
      title,
      description,
      price,
      date
    );

    sendRequestWithAuthentication(requestBody, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);

        const newEvent = {
          _id: response.data.createEvent._id,
          title: response.data.createEvent.title,
          description: response.data.createEvent.description,
          date: response.data.createEvent.date,
          price: response.data.createEvent.price,
          creator: {
            _id: this.context.userId
          }
        };

        this.setState((prevState) => {
          const events = [...prevState.events, newEvent];
          return { events: events };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  createEventCancelHandler = () => {
    this.setState({ creatingEvent: false });
  };

  bookEventHandler = () => {
    console.log('BOOK EVENT');

    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }

    const requestBody = buildBookEventRequest(this.state.selectedEvent._id);

    sendRequestWithAuthentication(requestBody, this.context.token)
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

  bookEventCancelHandler = () => {
    this.setState({ selectedEvent: null });
  };

  fetchEvents = () => {
    console.log('FETCH EVENTS');

    this.setState({ loadingPage: true });

    const requestBody = buildGetEventsRequest();

    sendRequest(requestBody)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        const events = response.data.events;
        if (this.isPageActive)
          this.setState({ events: events, loadingPage: false });
      })
      .catch((error) => {
        console.error(error);
        if (this.isPageActive) this.setState({ loadingPage: false });
      });
  };

  showDetailHandler = (eventId) => {
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find((e) => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
  };

  render() {
    const creatingEventModal = (
      <Modal
        title='Add Event'
        canConfirm
        onConfirm={this.createEventConfirmHandler}
        canCancel
        onCancel={this.createEventCancelHandler}
        confirmText='Confirm'
      >
        <form>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' ref={this.titleElement}></input>
          </div>

          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input type='number' id='price' ref={this.priceElement}></input>
          </div>

          <div className='form-control'>
            <label htmlFor='date'>Date</label>
            <input
              type='datetime-local'
              id='date'
              ref={this.dateElement}
            ></input>
          </div>

          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              rows='4'
              ref={this.descriptionElement}
            ></textarea>
          </div>
        </form>
      </Modal>
    );

    let selectingEventModal;
    if (this.state.selectedEvent) {
      selectingEventModal = (
        <Modal
          title={this.state.selectedEvent.title}
          canConfirm
          onConfirm={this.bookEventHandler}
          canCancel
          onCancel={this.bookEventCancelHandler}
          confirmText={this.context.token ? 'Book' : 'Confirm'}
        >
          <span className='price'>
            Price: ${this.state.selectedEvent.price}
          </span>
          <span className='date'>
            Date: {new Date(this.state.selectedEvent.date).toLocaleDateString()}
          </span>
          <p>{this.state.selectedEvent.description}</p>
        </Modal>
      );
    }

    const createEventsHeader = (
      <div className='event__control'>
        <p>Share your own Events</p>
        <button className='btn' onClick={this.startCreateEventHandler}>
          Create Event
        </button>
      </div>
    );

    return (
      <React.Fragment>
        {(this.state.creatingEvent || this.state.selectedEvent) && <Backdrop />}

        {this.state.creatingEvent && creatingEventModal}

        {this.state.selectedEvent && selectingEventModal}

        {this.context.token && createEventsHeader}

        {this.state.loadingPage ? (
          <Spinner />
        ) : (
          <EventList
            events={this.state.events}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EventsPage;
