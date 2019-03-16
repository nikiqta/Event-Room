import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchThunk, fetchEventsThunk } from "../../actions/eventActions";
import EventList from "../Common/EventList";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForApproval: false,
      query: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault(e);
  }

  render() {
    const { loggedIn, isAdmin, removeEvent } = this.props;
    const events = this.props.events.events || [];
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Welcome to Event Rooms</h1>
            { loggedIn &&
              <form
                  onSubmit={this.onSubmitHandler}
                  className="form-inline mb-5"
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
            }
            <EventList
                isForApproval={this.state.isForApproval}
                loggedIn={loggedIn}
                isAdmin={isAdmin}
                events={ events }
                removeEvent={removeEvent}
                />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login,
    events: state.events
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchSearch: (query) => dispatch( fetchSearchThunk(query) ),
    fetchEvents: () => dispatch( fetchEventsThunk() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
