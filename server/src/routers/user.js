const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const upload = require('../avatar/avatar')
const sharp = require('sharp')

// @desc    Register User
// @access  Public
router.post('/users', async (req, res) => {
    //oauth
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
        // ADD Oauth
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