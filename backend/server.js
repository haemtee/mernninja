require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workout', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen express
        app.listen(process.env.PORT, () => {
            console.log('db connected & app listening on port ' + process.env.PORT 
            + '\nhttp://localhost:4000/api/workout')
        })
    })
    .catch((err) => console.log(err))
