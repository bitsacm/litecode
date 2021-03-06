const express = require('express')
const router = new express.Router()
const Room = require('../models/room')
const crypto = require("crypto")
const auth = require('../middleware/auth')
const banStatus = require('../middleware/banStatus')

// @desc    Create New Room
// @access  Private
// query params -> /createRoom?roomName=randomGroup123
// if no query, random 6 character hex string
router.post('/createRoom', auth, banStatus, async (req, res) => {
    const query = req.query.roomName
    const room = new Room({
        users: []
    })

    if (query) {
        const roomDuplicate = await Room.findOne({ roomID: query })
        if (roomDuplicate) {
            return res.status(400).json({ error: 'room with that name already exists' })
        }
        room.roomID = query
    } else {
        while (1) {
            var id = crypto.randomBytes(3).toString('hex')
            var roomExists = await Room.findOne({ roomID: id })
            if (!roomExists) {
                break
            }
        }
        room.roomID = id
    }
    await room.save()

    if (req.user.inRoom) {
        const room2 = await Room.findOne({ roomID: req.user.roomID })

        room2.usersInRoom--
        room2.roomFull = false

        room2.users = room2.users.filter((user) => {
            return !user.userID.equals(req.user._id)//If the id isn't equal, it stays in the array.
        })

        if (room2.roomAdmin.equals(req.user._id)) {
            if (room2.usersInRoom) {
                room2.roomAdmin = room2.users[0].userID
            } else {
                room2.roomAdmin = null
            }
        }
        await room2.save()
    }

    const userID = req.user._id
    req.user.inRoom = true
    req.user.roomID = room.roomID
    room.usersInRoom++
    room.users = room.users.concat({ userID })
    room.roomAdmin = userID

    await req.user.save()
    await room.save()

    const user = req.user
    res.status(200).json({ user, room })
})

// @desc    GET all rooms which are not full/locked
// @access  Private
router.get('/rooms', auth, async (req, res) => {
    try {
        if (req.user.isBanned) {
            const timeElapsed = Date.now() - req.user.banTime
            if (timeElapsed > 2 * 24 * 3600 * 1000) {
                req.user.isBanned = false
            }
            await req.user.save()
        }
        await Room.deleteMany({ usersInRoom: 0 })
        const rooms = await Room.find({ roomFull: false, roomLocked: false }).sort({ usersInRoom: "desc" }).populate('users.userID')
        res.status(200).json(rooms)
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

// @desc    GET all rooms which are not full/locked and match the inputed query
// @access  Private
// query params -> /searchRoom?roomName=randomGroup123
router.get('/searchRoom', auth, async (req, res) => {
    const query = req.query.roomName
    try {
        if (query) {
            const rooms = await Room.find({ roomFull: false, roomLocked: false, roomID: new RegExp(query, 'i') }).sort({ usersInRoom: "desc" }).populate('users.userID')
            res.status(200).json(rooms)
        }
        else {
            res.redirect('/rooms')
        }
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

// @desc    GET room details
// @access  Private
router.get('/room/:id', auth, async (req, res) => {
    const id = req.params.id
    const room = await Room.findOne({ roomID: id }).populate('users.userID')
    if (room) {
        res.status(200).json({ room })
    }
    else {
        res.status(400).json({ error: 'Room does not exist' })
    }
})

// @desc    Join Room using roomID
// @access  Private
router.post('/joinRoom/:id', auth, banStatus, async (req, res) => {
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
        else if (room.roomLocked) {
            return res.status(400).json({ error: 'Room Locked' })
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
        res.status(400).json({ error: `${err}` })
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

        if (room.roomAdmin.equals(req.user._id)) {
            if (room.usersInRoom) {
                room.roomAdmin = room.users[0].userID
            }
            else {
                room.roomAdmin = null
            }
        }

        if (room.usersInRoom) {
            req.user.isBanned = true
            req.user.banTime = Date.now()
        }

        await req.user.save()
        await room.save()

        res.status(200).json({ msg: 'Room left' })
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

module.exports = router