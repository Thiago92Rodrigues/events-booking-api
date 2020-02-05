import React from 'react';
import { Component } from 'react';

// Components
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/BookingList/BookingList';
import BookingControl from '../components/BookingControl/BookingControl';
import Chart from '../components/BookingChart/BookingChart';

// Contexts
import AuthContext from '../context/auth-context';

class BookingsPage extends Component {
  state = {
    is_loading: false,
    bookings: [],
    outputType: 'list'
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ is_loading: true });

    const request_body = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
            }
          }
        }
      `
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
        console.log('Fetched Events ', data);
        const bookings = data.data.bookings;
        this.setState({ bookings: bookings, is_loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ is_loading: false });
      });
  };

  deleteBookingHandler = (booking_id) => {
    this.setState({ is_loading: true });

    const request_body = {
      query: `
        mutation {
          cancelBooking(bookingId: "${booking_id}") {
            _id
            title
          }
        }
      `
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
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== booking_id;
          });
          return { bookings: updatedBookings, is_loading: false };
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ is_loading: false });
      });
  };

  changeOutputTypeHandler = (outputType) => {
    if (outputType === 'list') {
      this.setState({ outputType: 'list' });
    } else {
      this.setState({ outputType: 'chart' });
    }
  };

  render() {
    let content;
    if (this.state.is_loading) {
      content = <Spinner />;
    } else {
      content = (
        <React.Fragment>
          <BookingControl
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          ></BookingControl>

          <div>
            {this.state.outputType === 'list' ? (
              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              ></BookingList>
            ) : (
              <Chart bookings={this.state.bookings} />
            )}
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default BookingsPage;
