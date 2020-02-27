const buildLoginRequest = (email, password) => {
  return {
    query: `
      query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userId
          token
          tokenExpiration
        }
      }
    `,
    variables: {
      email: email,
      password: password
    }
  };
};

const buildCreateUserRequest = (email, password) => {
  return {
    query: `
      mutation CreateUser($email: String!, $password: String!) {
        createUser(userInput: {email: $email, password: $password}) {
          _id
          email
        }
      }
    `,
    variables: {
      email: email,
      password: password
    }
  };
};

const buildCreateEventRequest = (title, description, price, date) => {
  return {
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
};

const buildBookEventRequest = (id) => {
  return {
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
      id: id
    }
  };
};

const buildGetEventsRequest = () => {
  return {
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
};

const buildGetBookingsRequest = () => {
  return {
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
};

const buildCancelBookingRequest = (id) => {
  return {
    query: `
      mutation CancelBooking($id: ID!) {
        cancelBooking(bookingId: $id) {
          _id
          title
        }
      }
    `,
    variables: {
      id: id
    }
  };
};

const sendRequest = (request_body) => {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    body: JSON.stringify(request_body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const sendRequestWithAuthentication = (request_body, token) => {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    body: JSON.stringify(request_body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });
};

export {
  buildLoginRequest,
  buildCreateUserRequest,
  buildCreateEventRequest,
  buildBookEventRequest,
  buildGetEventsRequest,
  buildGetBookingsRequest,
  buildCancelBookingRequest,
  sendRequest,
  sendRequestWithAuthentication
};
