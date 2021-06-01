const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomID:{
        type: String,
        required: true
    },
    usersInRoom: {
        type: Number,
        default: 0
    },
    users:[{
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    roomFull: {
        type: Boolean,
        default: false,
    },
    roomAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room