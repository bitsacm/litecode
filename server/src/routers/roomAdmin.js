const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/roomAdmin')
const Room = require('../models/room')
const User = require('../models/user')

// @desc    Lock/Unlock a room
// @access  Private
router.patch('/lock', auth, admin, async (req, res) => {
    try {
        const room = await Room.findOne({roomID: req.user.roomID })
        if (room.roomLocked) {
            room.roomLocked = false
            await room.save()
            res.json({ msg: 'room unlocked' })
        } else {
            room.roomLocked = true
            await room.save()
            res.json({ msg: 'room locked' })
        }
    } catch (err) {
        console.log(err)
    }
})

// @desc    Change Room Admin
// @access  Private
router.patch('/roomAdmin/:id', auth, admin, async (req, res) => {
    const userID = req.params.id
    const user = await User.findOne({ _id: userID })
    const room = await Room.findOne({roomID: req.user.roomID })
    if (!room.users.some(user => user.userID == userID)) {
        res.status(400).json({ error: 'User not in room' })
    } else {
        room.roomAdmin = userID
        await room.save()
        res.json({ msg: `${user.name} is the new admin` })
    }
})

// @desc    Remove user from a room
// @access  Private
router.patch('/remove/:id', auth, admin, async (req, res) => {
    const userID = req.params.id
    const user = await User.findOne({ _id: userID })
    const room = await Room.findOne({ roomID: req.user.roomID })
    if (!room.users.some(user => user.userID == userID)) {
        res.status(400).json({ error: 'User not in room' })
    } 

    user.inRoom = false
    user.roomID = "nil"
    room.usersInRoom--
    room.roomFull = false

    room.users = room.users.filter((user) => {
        return !user.userID.equals(userID)//If the id isn't equal, it stays in the array.
    })

    await user.save()
    await room.save()

    res.json({ msg: 'User removed' })
})

module.exports = router