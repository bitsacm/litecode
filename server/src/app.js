const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const roomRouter = require('./routers/room')
const adminRouter = require('./routers/roomAdmin')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(roomRouter)
app.use(adminRouter)

module.exports = app