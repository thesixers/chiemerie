const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    slotnumber: {type: String},
    amountPayed: {type: String},
    payersEmail:{type: String},
    ref:{type: String},
    ticketcode: {type: String},
    endDate: {type: String},
    status: {type: String, enum: ['active', 'inactive'], default: 'active'}
});


const Ticket = mongoose.model('carsTicket', ticketSchema);
module.exports = Ticket;