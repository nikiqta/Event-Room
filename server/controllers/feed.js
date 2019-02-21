const Event = require('../models/EventSchema');

module.exports = {

  getEvents: (req, res) => {
        Event.find()
        .then((events) => {
          res
            .status(200)
            .json({ message: 'Fetched games successfully.', events });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });

  },
  createEvent: (req, res) => {
    const eventObj = req.body;
    Event.create(eventObj)
    .then((event) => {
      res.status(200)
        .json({
          message: 'Event created successfully!',
          event
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  },
  editEvent: (req, res) => {
    const eventObj = req.body;
    const { id } = req.body;
    Event.findByIdAndUpdate(id,{
      ...eventObj
    })
        .then(() => {
          res.status(200)
              .json({
                message: 'Event edited successfully!',
              })
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
  },
  removeEvent: (req, res) => {
    const { id } = req.body;
    Event.findByIdAndRemove(id)
        .then(() => {
          res.status(200)
              .json({
                message: 'Event deleted successfully!',
              })
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
  }
  /*
    getGamesByCategory: (req, res) => {
    const category = req.params.category;
    Game.find({categories: {
      $all: [category]
    }})
      .then((games) => {
        res
          .status(200)
          .json({ message: `${category} games fetched.`, games })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  }
   */
};