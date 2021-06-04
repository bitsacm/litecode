const User = require('../models/user')
const Room = require('../models/room')

const admin = async (req, res, next) => {
    try {
        const roomID = req.user.roomID
        const room = await Room.find({roomID})
        if(room.roomAdmin.equals(req.user._id)){
            next()
        }
        else res.status(403).json({error: 'Not an admin'})
    } catch (err) {
        res.status(401).json({ error: `${err}` })
    }
}

module.exports = admin