const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const upload = require('../avatar/avatar')
const sharp = require('sharp')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
    await req.user.save()
    res.send()
}, (err, req, res, next) => { 
    res.status(400).send({ error: err.message })
})

router.get('/users/me/avatar', auth, async (req, res) => {
    try {
        if(!req.user.avatar){
            throw new Error('No Profile Pic Uploaded')
        }
        res.set('Content-Type','image/png')
        res.send(req.user.avatar)
    } catch (err) {
        console.log(err)
        res.status(400).send()
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = ''.toBuffer
    await req.user.save()
    res.send()
})

module.exports = router