const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    slotnumber: {type: String},
    ammountPayed: {type: String},
    payersEmail:{type: String},
    ref:{type: String}
});


const Ticket = mongoose.model('carsTicket', ticketSchema);
module.exports = Ticket;