import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Components
import MainNavigation from './components/Navigation/MainNavigation';

// Pages
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';

// Context
import AuthContext from './context/authContext';

// Style
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null
    };
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />

            <main className='main__content'>
              <Switch>
                <Route path='/events' component={EventsPage} />

                {/* if logged-in redirect to events page */}
                {this.state.token && <Redirect from='/' to='/events' exact />}
                {this.state.token && (
                  <Redirect from='/auth' to='/events' exact />
                )}

                {/* authentication route only exists if user is not logged-in */}
                {!this.state.token && (
                  <Route path='/auth' component={AuthPage} />
                )}

                {/* bookings route only exists if user is logged-in */}
                {this.state.token && (
                  <Route path='/bookings' component={BookingsPage} />
                )}

                {/* if not logged-in redirect to authentication page */}
                {!this.state.token && <Redirect to='/auth' exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
