import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {TextField} from '@material-ui/core';
import './Tickets.css';
import Ticket from "../Common/Ticket";
import {getEventThunk} from "../../actions/eventActions";
import { createTicketThunk } from '../../actions/ticketActions';

class TicketsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            showSeats: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSeatClickHandler = this.onSeatClickHandler.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getEvent(id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.ticketInfo.ticket) {
            this.props.notify(this.props.ticketInfo.ticket.message, 'success');
            this.props.history.push('/myTickets');
        }
    }

    onSeatClickHandler(seatNumber) {
        const ticketData = {
            owner: localStorage.getItem('userId'),
            paymentCardNumber: this.state.cardNumber,
            relatedEvent: this.props.event.eventDetails._id,
            seat: seatNumber
        };
        this.props.createTicket(ticketData);
    }

    onChangeHandler(e) {
        const currentCardNumber = e.target.value.toString();
        const lengthCheck = currentCardNumber.length === 16;
        if (lengthCheck) {
            this.setState({[e.target.name]: e.target.value, showSeats: true});
            this.props.notify('Debit Card Accepted! Please choose a seat.', 'success');
        } else {
            this.setState({[e.target.name]: e.target.value, showSeats: false});
        }
    }

    render() {
        const {eventDetails} = this.props.event || [];
        const {showSeats} = this.state;
        const {loggedIn, isAdmin} = this.props;

        let seats = [];

        if (eventDetails && showSeats) {
            const reservedSeats = eventDetails.reservedSeats;
            for (let i = 1; i <= eventDetails.availableSeats; i++) {
                seats.push(i)
            }
        }
        return (
            <div className="container text-center mx-auto my-5">
                <h1 className="text-info">Please select a seat</h1>
                <div className="col-12">
                    <p>In order to reserve a seat please enter the 16 digits card number of your bank card!</p>
                    <TextField
                        className="col-6"
                        type="number"
                        name="cardNumber"
                        value={this.state.cardNumber}
                        onChange={this.onChangeHandler}
                        label="Debit Card Number"
                        disabled={this.state.showSeats}
                    />
                </div>
                <ul className="col-12">
                    {showSeats && eventDetails && seats.map((s, index) => {
                        return (<Ticket
                            key={index * 13}
                            seatNumber={s}
                            reservedSeats={eventDetails.reservedSeats}
                            onSeatClicked={this.onSeatClickHandler}
                        />);
                    })}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.events,
        ticketInfo: state.tickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createTicket: (data) => dispatch(createTicketThunk(data)),
        getEvent: (eventId) => dispatch(getEventThunk(eventId))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TicketsPage));