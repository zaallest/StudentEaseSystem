//@desc Import Asyns handler inorder not to used try and catch blocks...
const asyncHandler = require('express-async-handler');
//Import Cousre model
const Course = require('../models/courseModel');
const { gradeValue, gradePoint } = require('../middleware/computeGrade');

//@desc Get all courses
//@route Get /api/courses 
//@access private
const getCourses = asyncHandler( async (req, res) => {
    //Get user ID
    const u_id = req.user._id;
    //Get user type
    const uT= req.user.userType;

    //Get courses by the user
    let courses;
    //check user type
    if (uT === 'A') {
        courses = await Course.find();
    }else{
        courses = await Course.find({userID: u_id});

    }
    

     //Check if courses exist...
     if (!courses) {
        res.status(400)
        throw new Error('No course found.')
    }
    res.status(200).json(courses)
});

//@desc Get a courses
//@route Get /api/courses/id 
//@access private
const getCourse = asyncHandler( async (req, res) => {
    const courseID = req.params.id;
    const course = await Course.findById(courseID)
    
    //Check if course exist...
    if (!course) {
        res.status(400)
        throw new Error('Course not found.')
    }
    res.status(200).json(course)
});

//@desc Post a courses
//@route Post /api/courses
//@access private
const addCourse = asyncHandler( async (req, res) => {

    let { courseName, courseCode, creditHours, examScore, courseGPA, grade, userID} = req.body;
    //Check if the required fields are entered...
    if (!courseName || !courseCode || !creditHours || !examScore ) {
        res.status(400)
        throw new Error('Course Name, Course Code, Exam Score, and Credit Hours are required.')
    }

    //Asign courseGPA and grade by invoking gradePoint() and gradeValue() methods....
    courseGPA = gradePoint(examScore, creditHours);
    grade = gradeValue(examScore);
    userID = req.user._id;
    console.log(courseGPA)
   
    //Add course 
    const course = await Course.create({
        courseName, courseCode, creditHours, examScore, courseGPA, grade, userID
    });

    //Send a response..
    res.status(200).json(course);
});

//@desc Update a courses
//@route Update /api/courses/id 
//@access private
const updateCourse = asyncHandler( async (req, res) => {
    //get user type
    const userT = req.user.userType;
    const u_ID = req.user._id;

    //Get course ID the course by the ID...
    let courseID = req.params.id;
    let course = await Course.findById(courseID);

    //Check if course no exist...
    if (!course) {
        res.status(400);
        throw new Error('Course not found.');
    }else{
        //Course exist...
        //Check user type..
        if (userT === 'B') {

            //Check if user IDs are same
            if (u_ID === String(course.userID)) {
                //Update course data...
                const updatedCourse = await Course.findByIdAndUpdate(courseID, req.body, {new : true,});
                res.status(200).json(updatedCourse);
            }else{
                res.status(401);
                throw new Error('You are not authorized to update this course..');
        
            }
    
        }else{
            //Admin
            //Update course data...
            const updatedCourse = await Course.findByIdAndUpdate(courseID, req.body, {new : true,});
            res.status(200).json(updatedCourse);
            
        }

    }
    
});

//@desc Delete a courses
//@route Delete /api/courses/id 
//@access private
const deleteCourse = asyncHandler( async (req, res) => {
    //get user type
    const userT = req.user.userType;
    const u_ID = req.user._id;
    
    //Get course ID the course by the ID...
    let courseID = req.params.id;
    let course = await Course.findById(courseID);
  
    //Check if course no exist...
    if (!course) {
        res.status(400);
        throw new Error('Course not found.');
    }else{
        //Course exist...

        //Check user type...
        if (userT === "B") {
            //get course ID

            //Check for the user ID 
            if (u_ID === course.userID) {
                //Delete Course data...
                await course.remove();
                res.status(200).json({id: courseID});

            }else{
                //User not match
                res.status(401);
                throw new Error('You are not authorized to update this course..');
        
            }
            
        }else{
            //Admin 
            //Delete Course data...
            await course.remove();
            res.status(200).json({id: courseID});

        }

    }

}); 

//@Desc Get number of courses registered or added...
//@route Get /api/courses/count/course
//@access private 
const countCourses = asyncHandler( async  (req, res) =>{

    //Get user type...
    const userT = req.user.userType;
    const user_ID = req.user._id;

    //Create variable to store number of courses
    var courseCount;
    //Check user and count the number of courses according to user otherwise count all ..
    if (userT === "A") {
        courseCount = await Course.countDocuments();
    }else{
        courseCount = await Course.countDocuments({userID: user_ID});
    }
    //Check if no course..
    if (!courseCount) {
        res.status(500);
        throw new Error('No Course Found...');
    }
    res.send({
        numbeOfCoutses: courseCount
    });
});


//Export controllers..
module.exports = { 
    getCourses, 
    getCourse, 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    countCourses
}