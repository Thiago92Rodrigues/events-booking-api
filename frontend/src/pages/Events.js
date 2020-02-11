import React from 'react';
import { Component } from 'react';

// Components
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import EventList from '../components/EventList/EventList';
import Spinner from '../components/Spinner/Spinner';

// Contexts
import AuthContext from '../context/auth-context';

// Style
import './Events.css';

class EventsPage extends Component {
  state = {
    creating: false,
    events: [],
    is_loading: false,
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
    console.log('CONFIRM HANDLER');
    console.log('CREATE EVENT');
    this.setState({ creating: false });

    const title = this.title_element.current.value;
    const price = +this.price_element.current.value;
    const date = this.date_element.current.value;
    const description = this.description_element.current.value;

    /*
    if (
      title.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0 ||
      !!price
    ) {
      console.log('error')
      return;
    }
    */

    const request_body = {
      query: `
          mutation CreateEvent($title: String!, $desc: String!, $price: Float!, $date: String!) {
            createEvent(eventInput: {title: $title, description: $desc, price: $price, date: $date}) {
              _id
              title
              description
              date
              price
            }
          }
        `,
      variables: {
        title: title,
        desc: description,
        price: price,
        date: date
      }
    };
    console.log('req ', request_body);
    console.log('token ', this.context.token);

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        console.log('CREATED EVENT ', data);
        this.setState((prevState) => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: data.data.createEvent._id,
            title: data.data.createEvent.title,
            description: data.data.createEvent.description,
            date: data.data.createEvent.date,
            price: data.data.createEvent.price,
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
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }

    const request_body = {
      query: `
          mutation BookEvent($id: ID!) {
            bookEvent(eventId: $id) {
              _id
             createdAt
             updatedAt
            }
          }
        `,
      variables: {
        id: this.state.selectedEvent._id
      }
    };

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        console.log('BOOKED EVENT ', data);
        this.setState({ selectedEvent: null });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchEvents = () => {
    this.setState({ is_loading: true });

    const request_body = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    };

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        console.log('FETCHED EVENTS ', data);
        const events = data.data.events;
        if (this.is_active)
          this.setState({ events: events, is_loading: false });
      })
      .catch((error) => {
        console.error(error);
        if (this.is_active) this.setState({ is_loading: false });
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
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>
              ${this.state.selectedEvent.price} -{' '}
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </h2>
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

        {this.state.is_loading ? (
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
