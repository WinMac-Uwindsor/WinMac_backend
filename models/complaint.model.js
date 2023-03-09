const mongoose = require('mongoose');


const TicketSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim:true,
    },
    message: {
        type:String,
        required:true,
        trim:true,

    },
},{timestamps: true, collection: 'Ticket'});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;