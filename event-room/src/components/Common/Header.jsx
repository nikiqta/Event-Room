import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
  const { logout, loggedIn, isAdmin } = props;

  return (
    <header className="container-fluid">
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </li>
          {!loggedIn && (
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
              >
                Login
              </NavLink>
            </li>
          )}
          {!loggedIn && (
            <li className="nav-item">
              <NavLink
                to="/register"
                className="nav-link"
              >
                Register
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <NavLink
                to="/events"
                className="nav-link"
                className="nav-link"
              >
                Events
              </NavLink>
            </li>
          )}
          {loggedIn && !isAdmin && (
            <li className="nav-item">
              <NavLink
                to="/create/event"
                className="nav-link"
              >
                Create Event
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <NavLink
                to="/pending/events"
                className="nav-link"
              >
                Pending Events
              </NavLink>
            </li>
          )}
          {(loggedIn && !isAdmin) && (
            <li className="nav-item">
              <NavLink
                to="/myTickets"
                className="nav-link"
              >
                My Tickets
              </NavLink>
            </li>
          )}
                    {(loggedIn && !isAdmin) && (
            <li className="nav-item">
              <NavLink
                to="/myEvents"
                className="nav-link"
              >
                My Events
              </NavLink>
            </li>
          )}
          {loggedIn && (
            <li className="nav-item float-right">
              <a
                href="javascript:void(0)"
                className="nav-link float-right"
                onClick={logout}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
