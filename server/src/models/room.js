const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomID:{
        type: String
    },
    usersInRoom: {
        type: Number
    },
    roomFull: {
        type: Boolean
    },
    roomAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room