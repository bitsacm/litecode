const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const upload = require('../avatar/avatar')
const sharp = require('sharp')

// @desc    Register User
// @access  Public
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token })
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

// @desc    Login User
// @access  Public
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

// @desc    Logout User
// @access  Private
router.post('/users/logout', auth, async (req, res) => {
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

// @desc    Update Current User Profile
// @access  Private
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) //Converts object to an array of strings!
    const allowedUpdates = ['name', 'phoneNo', 'password', 'bio', 'yearOfStudy']
    const isValidOperation = updates.every((update) => { //Checks if all the elements of an array satisfy a condition. Even if one fails, false is returned!
        if (allowedUpdates.includes(update)) return true
    })

    if (isValidOperation) {
        try {
            updates.forEach((update) => {
                req.user[update] = req.body[update]
            })
            await req.user.save()
            res.json(req.user)
        } catch (err) {
            res.status(400).json({ error: `${err}` })
        }
    }
    else {
        res.status(403).json({ error: 'invalid update' })
    }
})

// @desc    Upload avatar
// @access  Private
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
    await req.user.save()
    res.send()
}, (err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

// @desc    GET current avatar
// @access  Private
router.get('/users/me/avatar', auth, async (req, res) => {
    try {
        if (!req.user.avatar) {
            return res.json({ errors: [{ msg: 'No Profile Pic Uploaded' }] })
        }
        res.set('Content-Type', 'image/png')
        res.send(req.user.avatar)
    } catch (err) {
        res.status(400).json({ error: `${err}` })
    }
})

// @desc    Delete current avatar
// @access  Private
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = ''.toBuffer
    await req.user.save()
    res.send()
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