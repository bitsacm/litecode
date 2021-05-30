const express = require('express')
require('./db/mongoose')
require('./models/user')

const app = express()

app.use(express.json())

module.exports = app