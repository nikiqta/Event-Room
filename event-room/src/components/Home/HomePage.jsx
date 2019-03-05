import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
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
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Welcome to Event Rooms</h1>

            <form
              onSubmit={this.onSubmitHandler}
              className="form-inline my-2 my-lg-0"
            >
              <input
                className="form-control mr-sm-2"
                placeholder="Search"
                onChange={e => this.onChangeHandler(e)}
                type="text"
                name="query"
                value={this.state.query}
              />
              <input
                className="btn btn-secondary my-2 my-sm-0"
                value="Search"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
