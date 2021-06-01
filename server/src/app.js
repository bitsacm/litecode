const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const roomRouter = require('./routers/room')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(roomRouter)

module.exports = app