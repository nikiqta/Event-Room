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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.notify = this.notify.bind(this);
  }

  notify(message, type) {
    toast[type](message, {
      closeButton: false,
      position: 'top-center'
    });
  }

  render() {
    return (
      <div className="App">
        <Header loggedIn={this.state.loggedIn} logout={this.onLogoutHandler} />
        <ToastContainer />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <HomePage {...props} notify={this.notify} />}
            />
            <Route
              path="/login"
              render={props => <LoginPage {...props} notify={this.notify} />}
            />
            {/* <Route path="/register" component={RegisterPage} /> */}
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
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
