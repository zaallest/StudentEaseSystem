//@desc Import monguse and initialize mongoose
const { Long, Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//User schema to captured all the fields necessary for a user...
const courseSchema = new Schema ({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: "User"
    },
    courseName : {
        type: mongoose.SchemaTypes.String,
        require: [true, 'Course Name is required.']
    },
    courseCode : {
        type: mongoose.SchemaTypes.String,
        require: [true, 'Course Code is required.']
    },
    creditHours : {
        type: mongoose.SchemaTypes.String,
        require: [true, 'Credit hours is required.']
    },
    examScore : {
        type: mongoose.SchemaTypes.Decimal128,
        require: [true, 'Exam score is required.']
    },
    courseGPA : {
        type: mongoose.SchemaTypes.Decimal128,
        
    },
    grade : {
        type: mongoose.SchemaTypes.String,
    },

}, {
    timestamps: true
});

const Course = mongoose.model('Courses', courseSchema);
//Export the course schema....
module.exports = Course;