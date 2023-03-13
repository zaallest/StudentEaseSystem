//@desc Import mongoose and initialize mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//User schema to captured all the fields necessary for a user...
const userSchema = new Schema ({
    firstName : {
        type: String,
        require: [true, 'First Name is required.']
    },
    lastName : {
        type: String,
        require: [true, 'Last Name is required.']
    },
    username : {
        type: String,
        unique: true,
        require: [true, 'Userame is required.']
    },
    password : {
        type: String,
        require: [true, 'Password is required.']
    },
    phoneNumber : {
        type: mongoose.SchemaTypes.Number,
        
    },
    address : {
        type: String,
    },
    userType : {
        type : String,
        default: 'B',
    },
    dateCreated : {
        type: mongoose.SchemaTypes.Date,
        require: true,
        default: new Date()

    }

})

const User = mongoose.model('User', userSchema)
//Export the user schema....
module.exports = User