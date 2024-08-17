require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
// const todoRoute = require('./routes/todo-route')
const authuser = require('./routes/user-route')
const app = express()
const reservedRouter = require('./routes/reserved-route') 

app.use(cors())
app.use(express.json())


// service
app.use('/auth', authRoute)
// app.use('/todos', todoRoute)
app.use('/info',authuser)
app.use('/booking',reservedRouter)

// notFound
app.use( notFound )

// error
app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))