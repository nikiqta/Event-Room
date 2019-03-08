import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserEventsThunk } from "../../actions/eventActions";

class MyEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getUserEvents(localStorage.getItem('userId'));
  }

  render() {
      const userEvents = this.props.userEvents || [];
      return (
          <h1>My Events</h1>
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