import React, {Component} from 'react';
import {getEventThunk} from '../../actions/eventActions';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class DetailsPage extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getEvent(id);
    }

    render() {
        const {eventDetails} = this.props.event || [];
        const { loggedIn, isAdmin } = this.props;
        const heldDate = eventDetails ? new Date(eventDetails.eventDate).toLocaleDateString() : null;
        const availableSeats = eventDetails ? eventDetails.availableSeats - eventDetails.reservedSeats.length : 'N/A';
        const id = eventDetails ? eventDetails._id : '';
        const userId = localStorage.getItem('userId') || undefined;
        const isApproved = this.props.match.params.type === 'approved';
        const isUserEvents = this.props.match.params.type === 'user-events';
        return (
            <div className="container jumbotron mx-auto my-5">
                <div className="row m-auto text-center">
                    <div className="col-xs-12 col-sm-10 col-md-8 text-center m-auto">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-12 col-md-8 m-auto text-center">
                                    <img src={eventDetails && eventDetails.imageUrl} alt=""
                                         className="col-12 m-auto text-center img-rounded img-responsive"/>
                                </div>
                                <div className="col-sm-12 col-md-12 m-auto text-center">
                                    <h3 className="col-sm-12 col-md-12 mx-auto my-2 text-center">
                                        Welcome to: {eventDetails && eventDetails.name}</h3>
                                    <p>
                                        <i className="glyphicon glyphicon-envelope"></i>Created by:
                                        <br/>
                                        <i className="glyphicon glyphicon-globe"></i><p
                                        className="font-weight-bold text-info"> {eventDetails && eventDetails.description} </p>
                                        <br/>
                                        <i className="glyphicon glyphicon-gift my-4"></i> Held
                                        on: {eventDetails && heldDate}
                                        <br/>
                                        <i className="glyphicon glyphicon-usd my-4"></i> Ticket
                                        Price: {eventDetails && eventDetails.ticketPrice} lv.
                                    </p>
                                    <p>
                                        <br/>
                                        <i className="glyphicon glyphicon-usd my-4"></i> Available seats
                                        left: {eventDetails && availableSeats} seats out
                                        of {eventDetails && eventDetails.availableSeats}
                                    </p>
                                    <div className="btn-group">
                                        {eventDetails && (loggedIn && eventDetails.creator !== userId) && !isAdmin &&
                                        <Link to={`/event/tickets/${id}`} className="btn btn-success m-1">Get a
                                            Ticket</Link> }
                                        {!isApproved &&  <Link to='/pending/events' className="btn btn-info m-1">Get Back</Link> }
                                        {isApproved &&  <Link to='/' className="btn btn-info m-1">Get Back</Link> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEvent: (eventId) => dispatch(getEventThunk(eventId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DetailsPage));