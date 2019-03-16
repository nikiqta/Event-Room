import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';

const EventCard = props => {
    const {isForApproval, approveEvent} = props;
    const {loggedIn, isAdmin, removeEvent} = props;
    const userId = localStorage.getItem('userId');
    const {
        name,
        eventDate,
        status,
        ticketPrice,
        creator,
        description,
        imageUrl,
        createdOn,
        availableSeats,
        participants,
        reservedSeats
    } = props.data;
    const heldDate = new Date(eventDate).toLocaleDateString();
    const id = props.data._id;
    const subDescription = description.substring(0, 50);
    const isUserCreator = creator === userId;
    const approvedEvent = status === 'Waiting For Approval';
    return (
        <div style={{margin: 'auto'}} className="m-2 card col-3">
            <div className="m-auto text-center">
                <img
                    className="m-auto text-center card-img-top col-8"
                    src={imageUrl}
                    alt="Card image cap"
                />
                <div className="card-body text-center">
                    <h5 className="card-title  col-12">{name}</h5>
                    <p className="card-text white-space-nowrap col-12">{`${subDescription}...`}</p>
                </div>
                <ul className="list-group list-group-flush text-center">
                    <li className="list-group-item text-center white-space-nowrap col-11">Will be held
                        on: {heldDate}</li>
                    <li className="list-group-item text-center white-space-nowrap col-11">Ticket
                        Price: {ticketPrice} lv.
                    </li>
                    <li className="list-group-item text-center white-space-nowrap col-11">Initial
                        Seats: {availableSeats}</li>
                </ul>
                {
                    !isForApproval && !approvedEvent &&
                    <div className="card-body text-center">
                        <Link to={`/details/${'approved'}/${id}`} className="btn btn-info m-1">Details</Link>
                        {isUserCreator && <button
                            onClick={() => removeEvent(id)}
                            className="btn btn-danger m-1">Delete</button>}
                        {isUserCreator && <Link to={`/edit/event/${id}`} className="btn btn-warning m-1">Edit</Link>}
                    </div>}
                {
                    isForApproval &&
                    <div className="card-body text-center">
                        <Link to={`/details/${'unapproved'}/${id}`} className="btn btn-info m-1">Details</Link>
                        <button
                            className="btn btn-success m-1"
                            onClick={() => approveEvent(id)}
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => removeEvent(id)}
                            className="btn btn-danger m-1">Delete
                        </button>
                    </div>
                }
                {approvedEvent && !isAdmin &&
                <div className="font-weight-bold text-danger my-5"> Waiting For Approval!</div>
                }
            </div>
        </div>
    );
};

export default EventCard;
