const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const userRouter = require('./routers/user')
const roomRouter = require('./routers/room')
const adminRouter = require('./routers/roomAdmin')
const googleLoginRouter = require('./oauth2/googleAuthRouters')

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(roomRouter)
app.use(adminRouter)
app.use(googleLoginRouter)

module.exports = app