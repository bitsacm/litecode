const mongoose = require("mongoose");
require("dotenv").config();

const roomSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    usersInRoom: {
        type: Number,
        default: 0
    },
    users: [{
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    roomFull: {
        type: Boolean,
        default: false,
    },
    roomLocked: {
        type: Boolean,
        default: false
    },
    roomAdmin: {
        type: mongoose.Schema.Types.ObjectId,
    },
    costPerMember: {
        type: Number,
        default: process.env.LITECODE_PRICE
    },
    toPay: {
        type: Number,
        default: process.env.LITECODE_PRICE
    }
})

roomSchema.pre('save', async function (next) {
    if(this.usersInRoom){
        this.costPerMember = (process.env.LITECODE_PRICE)/(this.usersInRoom)
    } else{
        this.costPerMember = process.env.LITECODE_PRICE
    }
    this.toPay = (process.env.LITECODE_PRICE)/(this.usersInRoom + 1)
    next()
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room