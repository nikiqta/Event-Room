const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creationDate: { type: mongoose.SchemaTypes.Date, default: Date.now },
    content: { type: mongoose.SchemaTypes.String },
    relatedEvent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Event' },
    isEdited: { type: mongoose.SchemaTypes.Boolean, default: false }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;