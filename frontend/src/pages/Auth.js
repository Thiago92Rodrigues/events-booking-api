import React from 'react';
import { Component } from 'react';

// Context
import AuthContext from '../context/authContext';

// Style
import './Auth.css';

import {
  buildLoginRequest,
  buildCreateUserRequest
} from '../utils/queryBuilder';

import { sendRequest } from '../utils/requestsAPI';

class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoginMode: true // in which mode the user is: login mode or signup mode
    };

    this.emailElement = React.createRef();
    this.passwordElement = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLoginMode: !prevState.isLoginMode };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    const email = this.emailElement.current.value;
    const password = this.passwordElement.current.value;

    // check if the inputs are valid
    if (email.trim().length === 0 || password.trim().length === 0) return;

    let requestBody;

    if (this.state.isLoginMode) {
      console.log('LOGIN');
      requestBody = buildLoginRequest(email, password);
    } else {
      console.log('CREATE USER');
      requestBody = buildCreateUserRequest(email, password);
    }

    sendRequest(requestBody)
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
          {this.state.isLoginMode ? 'Login' : 'Sign Up'}
        </span>

        <form className="auth__form" onSubmit={this.submitHandler}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={this.emailElement} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordElement} />
          </div>

          <div className="form-actions">
            <button type="submit">Submit</button>

            {/* Switch page's mode button */}
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {this.state.isLoginMode ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AuthPage;
