import React from 'react';
import { NavLink } from 'react-router-dom';

// Contexts
import AuthContext from '../../context/auth-context';

// Style
import './MainNavigation.css';

const mainNavigation = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="main__navbar">
          <div className="main__navbar__logo">
            <span>Events Bookings</span>
          </div>

          <nav className="main__navbar__items">
            <ul>
              {/* authentication tab only appears if there is no token */}
              {!context.token && (
                <li>
                  <NavLink to="/auth">Authentication</NavLink>
                </li>
              )}

              <li>
                <NavLink to="/events">Events</NavLink>
              </li>

              {/* bookings tab only appears if there is a token */}
              {context.token && (
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
              )}

              {context.token && (
                <li>
                  <button onClick={context.logout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
