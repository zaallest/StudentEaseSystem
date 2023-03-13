const express = require('express');
const { 
    getUsers, 
    getUser, 
    addUser, 
    updateUser, 
    deleteUser, 
    userLogin, 
    countUsers, 
    currentUser 
} = require('../controllers/userController');
const { validateToken } = require('../middleware/webToken');
const router = express.Router();



//Get all users route...
router.get('/', validateToken, getUsers);

//Get users by ID route...
router.get('/:id', validateToken, getUser);

//Post user route...
router.post('/register',addUser );

//Update user route...
router.put('/:id', validateToken, updateUser);

//Delete user route...
router.delete('/:id', validateToken, deleteUser);

//Login user route...
router.post('/login', userLogin);

//Current users route...
router.get('/current/user', validateToken, currentUser);

//Count users route...
router.get('/count/user', validateToken, countUsers);


//Export users router...
module.exports = router;