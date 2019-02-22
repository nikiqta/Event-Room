const Ticket = require('../models/TicketSchema');
const Event = require('../models/EventSchema');

module.exports = {
  getMyEventTickets: (req, res) => {
    const { relatedEvent } = req.body;

    Ticket.find({ relatedEvent: relatedEvent })
      .populate('owner')
      .then(tickets => {
        res
          .status(200)
          .json({ message: 'Fetched events tickets successfully.', tickets });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  getUserTickets: (req, res) => {
    const { id } = req.body;

    Ticket.find({ owner: id })
      .then(tickets => {
        res
          .status(200)
          .json({ message: 'Fetched users tickets successfully.', tickets });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createTicket: async (req, res) => {
    const ticketObj = req.body;

    await Ticket.create({
      ...ticketObj
    })
      .then(ticket => {
        const id = ticket.relatedEvent;
        Event.findByIdAndUpdate(id, {
          $push: {
            participants: ticket.owner,
            reservedSeats: ticket.seat
          }
        })
          .then(event => {
            res
              .status(200)
              .json({ message: 'Ticket Created successfully.', ticket });
          })
          .catch(error => {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  }
};
