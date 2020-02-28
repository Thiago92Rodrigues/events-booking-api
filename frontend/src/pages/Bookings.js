import React from 'react';
import { Component } from 'react';

// Components
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/BookingList/BookingList';
import BookingControl from '../components/BookingControl/BookingControl';
import Chart from '../components/BookingChart/BookingChart';

// Contexts
import AuthContext from '../context/authContext';

import {
  buildGetBookingsRequest,
  buildCancelBookingRequest
} from '../utils/queryBuilder';

import { sendRequestWithAuthentication } from '../utils/requestsAPI';

class BookingsPage extends Component {
  state = {
    loading: false,
    bookings: [],
    outputType: 'list'
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    console.log('FETCH BOOKINGS');

    this.setState({ loading: true });

    const request_body = buildGetBookingsRequest();

    sendRequestWithAuthentication(request_body, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        const bookings = response.data.bookings;
        this.setState({ bookings: bookings, loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  deleteBookingHandler = (booking_id) => {
    console.log('DELETE BOOKING');

    this.setState({ loading: true });

    const request_body = buildCancelBookingRequest(booking_id);

    sendRequestWithAuthentication(request_body, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== booking_id;
          });
          return { bookings: updatedBookings, loading: false };
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
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
    if (this.state.loading) {
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
