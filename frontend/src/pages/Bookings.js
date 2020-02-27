import React from 'react';
import { Component } from 'react';

// Components
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/BookingList/BookingList';
import BookingControl from '../components/BookingControl/BookingControl';
import Chart from '../components/BookingChart/BookingChart';

// Contexts
import AuthContext from '../context/auth-context';

import {
  buildGetBookingsRequest,
  buildCancelBookingRequest,
  sendRequestWithAuthentication
} from '../utils/api-requests';

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
    console.log('FETCH BOOKINGS');

    this.setState({ is_loading: true });

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
        this.setState({ bookings: bookings, is_loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ is_loading: false });
      });
  };

  deleteBookingHandler = (booking_id) => {
    console.log('DELETE BOOKING');

    this.setState({ is_loading: true });

    const request_body = buildCancelBookingRequest(booking_id);

    sendRequestWithAuthentication(request_body, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
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
