const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: mongoose.SchemaTypes.String, required: true, unique: true },
    creator: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    creationDate: { type: mongoose.SchemaTypes.Date, default: Date.now },
    eventDate: {type: mongoose.SchemaTypes.Date, required: true },
    ticketPrice: {type: mongoose.SchemaTypes.Number, required: true },
    availableSeats: {type: mongoose.SchemaTypes.Number, required: true, minLength: 10, maxLength: 100 },
    reservedSeats: [{ type: mongoose.SchemaTypes.String }],
    description: { type: mongoose.SchemaTypes.String },
    participants: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    imageUrl: { type: mongoose.SchemaTypes.String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
