const express = require('express')
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse, countCourses } = require('../controllers/courseController')
const { validateToken } = require('../middleware/webToken')
const router = express.Router()


//Used validateToken as a middle ware to secure all the routs...
router.use(validateToken);

//Get all courses by user route...
router.get('/', getCourses);

//Get courses by id route...
router.get('/:id', getCourse);

//Post course route...
router.post('/', addCourse);

//Update course route...
router.put('/:id', updateCourse);

//Delete course route...
router.delete('/:id', deleteCourse);

//Count Courses
router.get('/count/course', countCourses);

//Export courses router...
module.exports = router