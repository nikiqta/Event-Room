import React, { Component, Fragment } from 'react';
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
    this.onChangeHanlder = this.onChangeHanlder.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHanlder(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.success) {
      this.props.notify(this.props.user.message, 'success');
      this.props.history.push('/');
    } else if (this.props.user.message &&  prevProps !== this.props){
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="enter username"
                value={this.state.username}
                onChange={this.onChangeHanlder}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="enter password"
                value={this.state.password}
                onChange={this.onChangeHanlder}
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
