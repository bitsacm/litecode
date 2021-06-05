const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Database connected')
}).catch((e)=>{
    console.log('Error')
    console.log(e)
})