import React from 'react';
import { Component } from 'react';

// Contexts
import AuthContext from '../context/auth-context';

// Style
import './Auth.css';

class AuthPage extends Component {
  // state inform in which mode the user is
  // login mode or signup mode
  state = {
    is_login: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.email_element = React.createRef();
    this.password_element = React.createRef();
  }

  // alters the current mode
  switchModeHandler = () => {
    this.setState((prevState) => {
      return { is_login: !prevState.is_login };
    });
  };

  // sends a request when user click submit
  // a login request when in login mode or a create-user request when in signup mode
  submitHandler = (event) => {
    event.preventDefault();

    // get inputs
    const email = this.email_element.current.value;
    const password = this.password_element.current.value;

    // check if the inputs are valid
    if (email.trim().length === 0 || password.trim().length === 0) return;

    let request_body;

    if (this.state.is_login) {
      request_body = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
      };
    } else {
      request_body = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

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
        console.log('DATA ', data);
        if (data.data.login) {
          this.context.login(
            data.data.login.token,
            data.data.login.userId,
            data.data.login.tokenExpiration
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
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
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.is_login ? 'SignUp' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
