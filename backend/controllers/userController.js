//@desc Import Asyns handler inorder not to used try and catch blocks...
const asyncHandler = require('express-async-handler');
//Import User model
const User = require('../models/userModel');
//Import hashpassword method..
const { hashPassword, comparePasswords } = require('../middleware/passwordHash');
//Import function to generate web token
const {sighToken } = require('../middleware/webToken');

//@desc Get all users
//@route Get /api/users 
//@access private
const getUsers = asyncHandler( async (req, res) => {
    const userT = req.body.userType;
    if (userT === "A") {
        try {
            const users = await User.find().select('-password');
            res.status(200).json(users);
        } catch (error) {
            res.status(404).json(error);
        }
    }
    
    res.status(401);
    throw new Error('You are not authorized to access this route....');

   
});

//@desc Get a users
//@route Get /api/users/id 
//@access private
const getUser = asyncHandler(  async (req, res) => {
    const userID = req.params.id
    const user = await User.findById(userID).select('-password')

    //Check if user exist...
    if (!user) {
        res.status(400)
        throw new Error('User not found.')
    }
    res.status(200).json(user)
})

//@desc Post a users
//@route Post /api/users
//@access public
const addUser = asyncHandler( async (req, res) => {
    let { firstName, lastName, username, password, phoneNumber, address, userType} = req.body
    //Check if the required fields are entered...
    if (!firstName || !lastName || !username || !password ) {
        res.status(400)
        throw new Error('First Name, Last Name, Username, Password are required.');
    }

    //Check if username already exist..
    const userExist = await User.findOne({username});
    if (userExist) {
        res.status(400);
        throw new Error('Username already exist try another username....');

    } 
    else{
        const hashedPassword = hashPassword(password);
        //console.log(hashedPassword);
        password = hashedPassword;
        const user = await User.create({
            firstName,
            lastName,
            username,
            password,
            phoneNumber,
            address,
            userType
        });
        res.status(201).json(user);
    }
   
    
})

//@desc Update a users
//@route Update /api/users/id 
//@access private
const updateUser = asyncHandler( async (req, res) => {
    const userID = req.params.id
    const user = await User.findById(userID)

    //Check if user not exist...
    if (!user) {
        res.status(400)
        throw new Error('User not found.')
    }

    //Update user data...
    const updatedUser = await User.findByIdAndUpdate(userID, req.body, {new : true,})
    res.status(200).json(updatedUser)
})

//@desc Delete a users
//@route Delete /api/users/id 
//@access private
const deleteUser = asyncHandler( async (req, res) => {

    const userID = req.params.id
    //Find user by ID...
    const user = await User.findById(userID)

    //Check if user not exist...
    if (!user) {
        res.status(400)
        throw new Error('User not found.')
    }

    //Delete user data...
    await user.remove()

    res.status(200).json({id: userID})
})

//User Login...
//@route Post /api/users/login 
//@access public
const userLogin = asyncHandler(async (req, res) => {
    //Get the username from the request body
    const {username, password} = req.body;

    //find and get user..
    const user = await User.findOne({username}).select('-password, -dateCreated');

    //check if user exist...
    if (!user) {
        res.status(400);
        throw new Error('User not found. Please check your Username correctly..');
    }
    //Get hashedPassword from the user
    const hashedPassword = user.password;

    //Invoke the comparePasswords method....
    const result = comparePasswords(password, hashedPassword);

    //Chech if passwords are not the same..
    if (!result) {
        res.status(400);
        throw new Error('Password incorrect. Please enter a correct password..');
    }

    //Generate JWT...
    const jwtToken = sighToken(user);

    return res.status(200).json({jwtToken});
    
});

//Current user..
//@route Get /api/users/current/user
//@access private
const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user);
});

//Get number of Users registered...
//@route Get /api/users/count/user
//@access private
const countUsers = asyncHandler( async  (req, res) =>{
    const userT = req.body.userType;
    const usersCount = await User.countDocuments();

    if (userT === "A") {
        if (!usersCount) {
            res.status(500);
            throw new Error('No User Found...');
    
        }
        res.send({
            numbeOfUsers: usersCount
        });
    }else{
        res.status(401);
        throw new Error('You are not authorized to acces this route..');

    }
    
});


module.exports = { getUsers, getUser, addUser, updateUser, deleteUser, userLogin, countUsers, currentUser }