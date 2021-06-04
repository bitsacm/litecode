const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

// @desc    Logout User
// @access  Private
router.post('/auth/logout', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).json({ error: `${err}` })
    }
})

// @desc    GET Current User Profile
// @access  Private
router.get('/users/me', auth, async (req, res) => {
    const user = req.user
    res.json({ user })
})

// @desc    Update Contact Info
// @access  Private
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) //Converts object to an array of strings!
    const allowedUpdates = ['phoneNo']
    const isValidOperation = updates.every((update) => {
        if (allowedUpdates.includes(update)) return true
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Not Allowed' })
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.json(req.user)
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

// @desc    DEL user
// @access  Private
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.json({ msg: 'User deleted successfully' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: `${err}` })
    }
})

module.exports = router