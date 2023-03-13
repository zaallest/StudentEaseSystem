const express = require('express')
require('dotenv/config')
const { errorHandler } = require('./middleware/errorMiddleware')
const bodyParser = require('body-parser')
const userRoutes = require('./routers/userRouts')
const courseRoutes = require('./routers/courseRouts')
const connectDB = require('./DBConnection/db')

//DB connection method..
connectDB()

//PORT server run on....
const port = process.env.PORT || 5000;

//Initialize express app...
const app = express()

//A middleware to allow the API to access JSON onjects
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json());

//Middleware to acess the routes...
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)

//Error handler middleware
app.use(errorHandler)


app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
   
})

