const express = require('express')
const router = new express.Router()
const { googleLoginUrl, getAccessTokenFromCode, getUserData } = require('./googleAuthHelpers')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/auth/google', async (req, res) => {
  res.json({ googleLoginUrl })
})

router.get('/auth/google/redirect', async (req, res) => {
  const code = req.query.code

  const { access_token } = await getAccessTokenFromCode(code)

  const data = await getUserData(access_token)

  if(!data.email.endsWith("bits-pilani.ac.in")){
    return res.redirect('https://litecode.bitsacm.in')
  }

  const user = await User.findOne({ email: data.email })

  if (!user) {
    const split = data.name.split(' ')
    var str = ""
    for (var i = 0; i < split.length; i++) {
      str = str + split[i].charAt(0).toUpperCase() + split[i].substring(1).toLowerCase() + ' '
    }

    const user = new User({
      email: data.email,
      name: str,
      avatar: data.picture
    })

    try {
      await user.save()
      const token = await user.generateAuthToken()

      res.cookie('jwt', token)
      res.redirect(req.query.state || 'https://litecode.bitsacm.in')

    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.cookie('jwt', token)
      res.redirect(req.query.state || 'https://litecode.bitsacm.in')

    } catch (error) {
      res.status(400).send(error)
    }
  }
})

router.post('/auth/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router