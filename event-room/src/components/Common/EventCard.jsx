import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = props => {
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
    <div style={{ margin: 'auto' }} className="m-2 card col-3">
      <div className="m-auto">
        <img
          className="m-auto card-img-top col"
          src={imageUrl}
          alt="Card image cap"
        />
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
        <Link to={`/details/${id}`} className="btn btn-info m-1">Details</Link>
        <Link to={`/tickets/${id}`} className="btn btn-success m-1">Tickets</Link>
        <Link to={`/delete/${id}`} className="btn btn-danger m-1">Delete</Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
