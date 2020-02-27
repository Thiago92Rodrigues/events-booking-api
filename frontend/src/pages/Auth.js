import React from 'react';
import { Component } from 'react';

// Contexts
import AuthContext from '../context/auth-context';

// Style
import './Auth.css';

import {
  buildLoginRequest,
  buildCreateUserRequest,
  sendRequest
} from '../utils/api-requests';

class AuthPage extends Component {
  state = {
    // in which mode the user is: login mode or signup mode
    is_login: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.email_element = React.createRef();
    this.password_element = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { is_login: !prevState.is_login };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    const email = this.email_element.current.value;
    const password = this.password_element.current.value;

    // check if the inputs are valid
    if (email.trim().length === 0 || password.trim().length === 0) return;

    let request_body;

    if (this.state.is_login) {
      request_body = buildLoginRequest(email, password);
    } else {
      request_body = buildCreateUserRequest(email, password);
    }

    sendRequest(request_body)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201)
          throw new Error('Failed');
        return response.json();
      })
      .then((response) => {
        console.log('response ', response);
        if (response.data.login) {
          this.context.login(
            response.data.login.token,
            response.data.login.userId,
            response.data.login.tokenExpiration
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <span className="auth__header">
          {this.state.is_login ? 'Login' : 'Sign Up'}
        </span>

        <form className="auth__form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={this.email_element} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.password_element} />
          </div>

          <div className="form-actions">
            <button type="submit">Submit</button>

            {/* Switch page's mode button */}
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {this.state.is_login ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AuthPage;
