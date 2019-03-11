import React, { Component, Fragment } from 'react';
import { TextField } from '@material-ui/core';
import { loginThunk } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.success && this.props.user !== prevProps.user) {
      this.props.notify(this.props.user.message, 'success');
      this.props.history.push('/');
    } else if (this.props.user.message && prevProps !== this.props) {
      this.props.notify(this.props.user.message, 'error');
    }
  }

  render() {
    return (
      <Fragment>
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <TextField
                className="inputFieldsWidth"
                id="username"
                type="text"
                name="username"
                value={this.state.username}
                label="Username"
                onChange={this.onChangeHandler}
                error={false}
                helperText={false}
              />
            </div>
            <div className="form-group">
              <TextField
                className="inputFieldsWidth"
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                label="Password"
                onChange={this.onChangeHandler}
                error={false}
                helperText={false}
              />
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
      </Fragment>
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
    login: (username, password) => dispatch(loginThunk(username, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
