import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserTicketsThunk} from "../../actions/eventActions";

class MyTickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CardNumber: ''
        };
    }

    componentDidMount() {
        this.props.getUserTickets(localStorage.getItem('userId'));
    }

    render() {
        const userTickets = this.props.userTickets || [];

        return (
            <div className="container col-10 row text-center m-auto">
                <h1 className="col-12">My Tickets</h1>
                {userTickets.length > 0 && userTickets.map((t) => {
                    const {name, imageUrl, eventDate, ticketPrice} = t.relatedEvent;
                    const heldDate = new Date(eventDate).toLocaleDateString();
                    const id = t._id;
                    return (
                        <div
                            key={id}
                            className="col-3 card text-center my-2 mx-auto"
                            >
                            <img className="card-img-top col " src={imageUrl} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title col">{name}</h5>
                                <ul className="list-group list-group-flush text-center">
                                    <li className=" col list-group-item text-center white-space-nowrap col">Will be held
                                        on: {heldDate}</li>
                                    <li className="list-group-item text-center white-space-nowrap col">Ticket
                                        Price: {ticketPrice} lv.
                                    </li>
                                </ul>
                                <button className="col btn btn-success my-2 mx-auto text-center">Print</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userTickets: state.events.userTickets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserTickets: (userId) => dispatch(getUserTicketsThunk(userId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MyTickets));

/*
0:
creationDate: "2019-03-13T20:14:33.448Z"
owner: "5c8652fd909d5a3190822449"
paymentCardNumber: "1111222233334444"
relatedEvent:
availableSeats: 70
creationDate: "2019-03-11T12:00:45.428Z"
creator: "5c80122d62aea30e1c8dc947"
description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
eventDate: "2019-03-20T00:00:00.000Z"
imageUrl: "data:image/png;base64,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"
name: "React 16.8 Presentation"
participants: (4) ["5c8652fd909d5a3190822449", "5c86663ec06ebf327c0ec894", "5c89661fc18dbb287cea213e", "5c896699c18dbb287cea2140"]
reservedSeats: (4) ["1", "2", "3", "7"]
status: "Approved"
ticketPrice: 10
__v: 0
_id: "5c864dedeedd1e22346681f4"
__proto__: Object
seat: "1"
__v: 0
_id: "5c8964a9c18dbb287cea213c"
__proto__: Object
length: 1
__proto__: Array(0)
 */