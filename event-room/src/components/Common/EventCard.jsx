import React from 'react';
import {Link} from 'react-router-dom'

const EventCard = (props) => {
    const {
        name,
        eventDate,
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
    return (
        <div style={{margin: 'auto'}} className="card col-4">
            <img className="card-img-top col-8" src={imageUrl} alt="Card image cap"/>
                <div className="card-body text-center">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <ul className="list-group list-group-flush text-center">
                    <li className="list-group-item">Will be held on: {heldDate}</li>
                    <li className="list-group-item">Ticket Price: {ticketPrice} lv.</li>
                    <li className="list-group-item">Initial Seats: {availableSeats}</li>
                </ul>
                <div className="card-body text-center">
                    <a href="#" className="card-link">Get a ticket</a>
                    <a href="#" className="card-link">Details</a>
                </div>
        </div>
    );
};

export default EventCard;