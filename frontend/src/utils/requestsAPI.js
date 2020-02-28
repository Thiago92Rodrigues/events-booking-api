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

export { sendRequest, sendRequestWithAuthentication };
