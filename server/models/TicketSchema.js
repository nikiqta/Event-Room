const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creationDate: { type: mongoose.SchemaTypes.Date, default: Date.now },
    paymentCardNumber: { type: mongoose.SchemaTypes.Number },
    event: { type: mongoose.SchemaTypes.ObjectId, ref: 'Event' },
    seat: { type: mongoose.SchemaTypes.String }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;