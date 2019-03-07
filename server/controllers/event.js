const Event = require('../models/EventSchema');
const Comment = require('../models/CommentSchema');
const Ticket = require('../models/TicketSchema');

module.exports = {
  getUserEvents: (req, res, next) => {
    const { id } = req.body;

    Event.find({ creator: id })
      .then(events => {
        res
          .status(200)
          .json({ message: 'Fetched events successfully.', events });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  getApprovedEvents: (req, res, next) => {
    Event.find()
      .where('status')
      .ne('Waiting For Approval')
      .then(events => {
        res
          .status(200)
          .json({ message: 'Fetched events successfully.', events });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  getUnapprovedEvents: (req, res, next) => {
    Event.find()
      .where('status')
      .ne('Approved')
      .then(events => {
        res
          .status(200)
          .json({ message: 'Fetched games successfully.', events });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createEvent: (req, res, next) => {
    const eventObj = req.body;
    Event.create(eventObj)
      .then(event => {
        res.status(200).json({
          message: 'Event created successfully!',
          event
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  editEvent: (req, res, next) => {
    const eventObj = req.body;
    const { id } = req.body;
    Event.findByIdAndUpdate(id, {
      ...eventObj
    })
      .then(() => {
        res.status(200).json({
          message: 'Event edited successfully!'
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  removeEvent: (req, res, next) => {
    const { id } = req.body;
    Event.findByIdAndRemove(id)
      .then(event => {
        Comment.find({ relatedEvent: event._id })
          .remove()
          .then(() => {
            Ticket.find({ relatedEvent: event._id })
              .remove()
              .then(() => {
                res.status(200).json({
                  message: 'Event deleted successfully!'
                });
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
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  }
};
