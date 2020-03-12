import React from 'react';
import { Component } from 'react';

// Components
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/BookingList/BookingList';
import BookingControl from '../components/BookingControl/BookingControl';
import BookingChart from '../components/BookingChart/BookingChart';

// Contexts
import AuthContext from '../context/authContext';

import {
  buildGetBookingsRequest,
  buildCancelBookingRequest
} from '../utils/queryBuilder';

import { sendRequestWithAuthentication } from '../utils/requestsAPI';

class BookingsPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
      bookings: [],
      outputType: 'list'
    };
  }

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    console.log('FETCH BOOKINGS');

    this.setState({ loadingPage: true });

    const requestBody = buildGetBookingsRequest();

    sendRequestWithAuthentication(requestBody, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        const bookings = response.data.bookings;
        this.setState({ bookings: bookings, loadingPage: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loadingPage: false });
      });
  };

  deleteBookingHandler = (bookingId) => {
    console.log('DELETE BOOKING');

    this.setState({ loadingPage: true });

    const requestBody = buildCancelBookingRequest(bookingId);

    sendRequestWithAuthentication(requestBody, this.context.token)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);

        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, loadingPage: false };
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loadingPage: false });
      });
  };

  changeOutputTypeHandler = (selectedOutputType) => {
    if (selectedOutputType === 'list') {
      this.setState({ outputType: 'list' });
    } else {
      this.setState({ outputType: 'chart' });
    }
  };

  render() {
    const pageContent = (
      <React.Fragment>
        <BookingControl
          activeOutputType={this.state.outputType}
          onChange={this.changeOutputTypeHandler}
        />

        <div>
          {this.state.outputType === 'list' ? (
            <BookingList
              bookings={this.state.bookings}
              onDelete={this.deleteBookingHandler}
            />
          ) : (
            <BookingChart bookings={this.state.bookings} />
          )}
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {this.state.loadingPage ? <Spinner /> : pageContent}
      </React.Fragment>
    );
  }
}

export default BookingsPage;
