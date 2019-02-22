const Comment = require('../models/CommentSchema');

module.exports = {
  getEventComments: (req, res) => {
    const { eventId } = req.body;

    Comment.find({ relatedEvent: eventId })
    .populate('creator')
      .then((comments) => {
        res.status(200).json({
          message: 'Comments successfully fetched!',
          comments
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createComment: (req, res) => {
    const commentObj = req.body;

    Comment.create(commentObj)
      .then(comment => {
        res.status(200).json({
          message: 'Comment created successfully!',
          comment
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  editComment: (req, res) => {
      const commentObj = req.body;

      Comment.findByIdAndUpdate(commentObj.id, {
         ...commentObj,
         isEdited: true
      })
      .then(() => {
          res.status(200).json({
             message: 'Comment edited successfully!' 
          })
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  deleteComment: (req, res) => {
    const { id } = req.body;
    Comment.findByIdAndRemove(id)
        .then(() => {
          res.status(200)
              .json({
                message: 'Comment deleted successfully!',
              })
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        });
  }
};
