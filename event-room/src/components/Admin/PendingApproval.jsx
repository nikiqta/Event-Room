import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPendingEventsThunk, approveEventThunk} from "../../actions/eventActions";
import {withRouter} from "react-router-dom";
import EventList from "../Common/EventList";

class PendingApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isForApproval: false
        };
        this.approveEventHandler = this.approveEventHandler.bind(this);
    }

async    approveEventHandler(eventId) {
        try {
         await    this.props.approveEvent(eventId);
            this.props.notify('Event Removed Successfully!', 'success');
            this.props.history.push('/');
        } catch (error) {
            this.props.notify(error.message, 'error');
        }
    }

    componentDidMount() {
        this.setState({isForApproval: true});
        //this.props.getApprovedEvents();
    }

    componentWillMount() {
        this.props.getApprovedEvents();
    }

    componentWillUnmount() {
        this.setState({isForApproval: false});
    }

    render() {
        const pendingEvents = this.props.pendingEvents || [];
        const {isAdmin, loggedIn, removeEvent} = this.props;
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        {pendingEvents.length === 0 &&
                        <h2>There Are Currently No Unapproved Events ...</h2>
                        }
                        {pendingEvents.length > 0 &&
                        <div>
                            <h1>Events Waiting For Approval</h1>
                            <EventList
                                isForApproval={this.state.isForApproval}
                                isAdmin={isAdmin}
                                loggedIn={loggedIn}
                                events={pendingEvents}
                                removeEvent={removeEvent}
                                approveEvent={this.approveEventHandler}
                            />
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {
        pendingEvents: state.events.pendingEvents || [],
        event: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getApprovedEvents: () => dispatch(fetchPendingEventsThunk()),
        approveEvent: (eventId) => dispatch(approveEventThunk(eventId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PendingApproval));