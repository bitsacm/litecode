const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomID:{
        type: String
    },
    // roomSize: {
    //     type: Number
    // },
    usersInRoom: {
        type: Number
    },
    roomFull: {
        type: Boolean
    }
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room