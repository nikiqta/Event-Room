import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserEventsThunk } from "../../actions/eventActions";
import EventList from "../Common/EventList";

class MyEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
      const userId = localStorage.getItem('userId');
    this.props.getUserEvents(userId);
  }

  render() {
      const userEvents = this.props.userEvents || [];
      const { isAdmin, loggedIn } = this.props;
      return (
          <div className="container">
              <div className="row space-top">
                  <div className="col-md-12">
                      <h1>Welcome to Your Events</h1>
                      {!userEvents.length &&
                      <h3 className="text-center m-auto">There Currently No Events...!</h3>
                      }
                      {userEvents.length > 0 &&
                      <EventList
                          isForApproval={false}
                          loggedIn={loggedIn}
                          isAdmin={isAdmin}
                          events={ userEvents }
                      />
                      }

                  </div>
              </div>
          </div>
      );
  }
}

function mapStateToProps(state){
   return{
      userEvents: state.events.userEvents
   }
}

function mapDispatchToProps(dispatch){
    return {
     getUserEvents: (userId) => dispatch(getUserEventsThunk(userId)) 
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(MyEvents));