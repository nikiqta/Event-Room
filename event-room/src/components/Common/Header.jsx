import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {

  const { logout, loggedIn, isAdmin, userId } = props;
 const isOnlyUser = loggedIn && (!isAdmin || isAdmin == 'false');
  return (
    <header className="container-fluid">
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <ul className="navbar-nav">
          <li key={133333} className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </li>
          {!loggedIn &&
            <li key={288888} className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
              >
                Login
              </NavLink>
            </li>
          }
          {!loggedIn &&
            <li key={377777} className="nav-item">
              <NavLink
                to="/register"
                className="nav-link"
              >
                Register
              </NavLink>
            </li>
          }
          {isOnlyUser &&
            <li key={4667777} className="nav-item">
              <NavLink
                to="/create/event"
                className="nav-link"
              >
                Create Event
              </NavLink>
            </li>
          }
          {(isAdmin == 'true' || isAdmin) && loggedIn &&
            <li key={56666} className="nav-item">
              <NavLink
                to="/pending/events"
                className="nav-link"
              >
                Pending Events
              </NavLink>
            </li>
          }
          {isOnlyUser &&
            <li key={666677} className="nav-item">
              <NavLink
                to="/myTickets"
                className="nav-link"
              >
                My Tickets
              </NavLink>
            </li>
          }
                    {isOnlyUser &&
            <li key={76767} className="nav-item">
              <NavLink
                to="/myEvents"
                className="nav-link"
              >
                My Events
              </NavLink>
            </li>
          }
          {loggedIn &&
            <li key={88678} className="nav-item float-right">
              <a
                href="javascript:void(0)"
                className="nav-link float-right"
                onClick={logout}
              >
                Logout
              </a>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
