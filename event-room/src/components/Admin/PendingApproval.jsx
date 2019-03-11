import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchPendingEventsThunk } from "../../actions/eventActions";
import {withRouter} from "react-router-dom";
import EventList from "../Common/EventList";

class PendingApproval extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isForApproval: false
        }

    }

    componentDidMount() {
        this.setState({isForApproval: true });
       this.props.approve();
    }

    componentWillUnmount() {
        this.setState({isForApproval: false });
    }

    render() {
        const pendingEvents = this.props.pendingEvents || [];
        const { isAdmin, loggedIn } = this.props;
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        { pendingEvents.length === 0 &&
                        <h2>There Are Currently No Unapproved Events ...</h2>
                        }
                        { pendingEvents.length > 0 &&
                            <div>
                                <h1>Events Waiting For Approval</h1>
                                <EventList
                                    isForApproval={this.state.isForApproval}
                                    isAdmin={ isAdmin }
                                    loggedIn={loggedIn}
                                    events={ pendingEvents }/>
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
       pendingEvents: state.events.pendingEvents || []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        approve: () => dispatch(fetchPendingEventsThunk())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PendingApproval));