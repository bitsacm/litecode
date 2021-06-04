const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Room = require('../models/room')
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
    },
    phoneNo: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value, ['en-IN'])) {
                throw new Error('Invalid Mobile')
            }
        }
    },
    avatar: {
        type: String
    },
    inRoom: {
        type: Boolean,
        required: true,
        default: false
    },
    roomID: {
        type: String,
        required: true,
        default: "nil"
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.__v
    return userObject
}

userSchema.pre('remove', async function (next) {
    if (this.inRoom) {
        roomID = this.roomID
        const room = await Room.findOne({ roomID })

        room.usersInRoom--
        room.roomFull = false

        room.users = room.users.filter((user) => {
            return !user.userID.equals(this._id)//If the id isn't equal, it stays in the array.
        })

        if (room.roomAdmin.equals(this._id)) {
            if (room.usersInRoom) {
                room.roomAdmin = room.users[0].userID
            }
            else {
                room.roomAdmin = null
            }
        }

        await room.save()
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User