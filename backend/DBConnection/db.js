//desc Import mongoose 
const mongoose = require('mongoose')

//Method to connect to Mongo database...
const connectDB = async () => {
    try {
        const conn = await mongoose.connect( process.env.DB_CONNECTION )
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

//Export the connectDB method
module.exports = connectDB