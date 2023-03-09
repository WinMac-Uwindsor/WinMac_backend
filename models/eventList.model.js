const mongoose = require('mongoose');


const event_listSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true,
    },
    event_id: {
        type:String,
        required:true,
        unique: true,
        trim:true,

    },
    date: {
        type:String,
        required:true,
        trim:true,
    },
    limit: {
        type:Number,
        required:true,
        trim:true,
    },
    time: {
        type:String,
        required:true,
        trim:true,
    },
    location: {
        type:String,
        required:true,
        trim:true,

    },
    Presenter: {
        type:String,
        required:true,
        trim:true,
    },
    Desc: {
        type:String,
        required:true,
        trim:true,
    }
},{timestamps: true, collection: 'event_list'});

const event_list = mongoose.model('event_list', event_listSchema);

module.exports = event_list;