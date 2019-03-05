import React, { Component, Fragment } from 'react';

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
    e.preventDefault(e);
  }

  render() {
    return (
      <Fragment>
        <div class="form-wrapper">
          <h1>Login</h1>
          <form>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter e-mail"
                value=""
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value=""
              />
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
      </Fragment>
    );
  }
}

export default LoginPage;
