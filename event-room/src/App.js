import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './components/Home/HomePage';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import NotFound from './components/Common/NotFound';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { logoutThunk } from './actions/authActions.js';
import DetailsPage from './components/Details/DetailsPage';
import TicketsPage from './components/Tickets/TicketsPage';
import CreatePage from './components/Create/CreatePage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.onLogoutHandler = this.onLogoutHandler.bind(this);
    this.notify = this.notify.bind(this);
  }

  onLogoutHandler() {
    this.setState({ loggedIn: false });
    this.props.logout();
    this.props.history.push('/');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.success && this.props !== prevProps) {
      this.setState({ loggedIn: true });
    }
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState({ loggedIn: true });
    }
  }

  notify(message, type) {
    toast[type](message, {
      closeButton: false,
      position: 'top-center'
    });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className="App">
        <Header loggedIn={loggedIn} logout={this.onLogoutHandler} />
        <ToastContainer />
        <main style={{ height: 'auto' }}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <HomePage {...props} loggedIn={loggedIn} notify={this.notify} />
              )}
            />
            <Route
              path="/login"
              render={props => <LoginPage {...props} notify={this.notify} />}
            />
            <Route
              path="/register"
              render={props => <RegisterPage {...props} notify={this.notify} />}
            />
            <Route
              path="/create"
              render={props => <CreatePage {...props} notify={this.notify} />}
            />
            <Route path="/details/:id" component={DetailsPage} />
            <Route path="/tickets/:id" component={TicketsPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutThunk())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
