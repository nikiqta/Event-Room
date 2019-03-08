import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserTicketsThunk } from "../../actions/eventActions";

class MyTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getUserTickets(localStorage.getItem('userId'));
  }

  render() {
      const userTickets = this.props.userTickets || [];
      return (
          <h1>My Tickets</h1>
      );
  }
}

function mapStateToProps(state){
   return{
      userTickets: state.events.userTickets
   }
}

function mapDispatchToProps(dispatch){
    return {
     getUserTickets: (userId) => dispatch(getUserTicketsThunk(userId)) 
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(MyTickets));