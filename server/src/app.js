const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const userRouter = require('./routers/user')
const roomRouter = require('./routers/room')
const adminRouter = require('./routers/roomAdmin')
const googleLoginRouter = require('./oauth2/googleAuthRouters')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(roomRouter)
app.use(adminRouter)
app.use(googleLoginRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

module.exports = app