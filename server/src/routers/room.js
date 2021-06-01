const express = require('express')
const router = new express.Router()
const Room = require('../models/room')
const crypto = require("crypto");
const auth = require('../middleware/auth')

// @desc    Create New Room
// @access  Public
router.post('/createRoom', async (req, res) => {
    const room = new Room({
        users: []
    })
    while (1) {
        var id = crypto.randomBytes(3).toString('hex');
        var roomExists = await Room.findOne({ roomID: id })
        if (!roomExists) {
            break
        }
    }
    room.roomID = id
    await room.save()
    res.status(201).json(room)
})

// @desc    GET room details
// @access  Private
router.get('/room/:id', auth, async (req, res) => {
    const id = req.params.id
    const room = await Room.findOne({ roomID: id })
    if (room) {
        res.status(200).json({ room })
    }
    else {
        res.status(400).json({ error: 'Room does not exist' })
    }
})

// @desc    Join Room using roomID
// @access  Private
router.post('/joinRoom/:id', auth, async (req, res) => {
    try {
        if (req.user.inRoom) {
            return res.status(400).json({ error: 'You are already in a Room' })
        }

        const userID = req.user._id
        const id = req.params.id
        const room = await Room.findOne({ roomID: id })
        if (!room) {
            return res.status(400).json({ error: 'Room not found' })
        }
        if (room.roomFull) {
            return res.status(400).json({ error: 'Room full' })
        }

        req.user.inRoom = true
        req.user.roomID = id
        room.usersInRoom++
        room.users = room.users.concat({ userID })
        if (room.usersInRoom === 4) {
            room.roomFull = true
        } else if (room.usersInRoom === 1) {
            room.roomAdmin = userID
        }

        await req.user.save()
        await room.save()

        const user = req.user
        res.status(200).json({ user, room })
    } catch (err) {
        res.status(400).send(err)
    }
})

// @desc    Leave current room
// @access  Private
router.post('/leaveRoom', auth, async (req, res) => {
    try {
        if (!req.user.inRoom) {
            return res.status(400).json({ error: 'You are not in a room' })
        }

        const room = await Room.findOne({ roomID: req.user.roomID })
        req.user.inRoom = false
        req.user.roomID = "nil"
        room.usersInRoom--
        room.roomFull = false

        room.users = room.users.filter((user) => {
            return !user.userID.equals(req.user._id)//If the id isn't equal, it stays in the array.
        })

        if(room.roomAdmin.equals(req.user._id)){
            if(room.usersInRoom){
                room.roomAdmin = room.users[0].userID
            }
            else{
                room.roomAdmin = null
            }
        }

        await req.user.save()
        await room.save()

        res.status(200).json({msg: 'Room left'})
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router