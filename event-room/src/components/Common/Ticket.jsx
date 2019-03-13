import React from 'react';

const Ticket = (props) => {
    const { seatNumber, reservedSeats, onSeatClicked } = props;
    const isReserved = reservedSeats.includes(seatNumber.toString());
  return (
      <li className="seat">
          {!isReserved &&
          <input
              style={{display: 'none'}}
              type="checkbox"
              id={`seat ${seatNumber}`}
              name={`seat ${seatNumber}`}
              onClick={() => onSeatClicked(seatNumber)}
          />
          }
          <label htmlFor={`seat ${seatNumber}`}>{isReserved ? `RESERVED` :`seat: ${seatNumber}`}</label>
      </li>
  )
};

export default  Ticket;