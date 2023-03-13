const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

//This function sign or generate a oken upon user login 
//The token expires after one day...
function sighToken(user){
    const token = jwt.sign(
        {
            user: user
        },
        process.env.SECRET,
        {expiresIn: '1d'}
    );

    return token;
}

//@Desc 
//Validate the token provided by the user..
const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    const secrete = process.env.SECRET;

    //Check if token exist and it start with 'Bearer'
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        
        jwt.verify(token, secrete, (err, decode) =>{
            if (err) {
                res.status(401);
                throw new Error("User not authorized");
            }
            
            //Attach user to the request body
            req.user = decode.user;
            //console.log(req.user);
            next();
            
        });
        
    }

    //Check if token is missing
    //then throw an error message..
    if (!token) {
        res.status(401);
        throw new Error("User not authorized or missing token....");
    }

});

module.exports = {
    sighToken,
    validateToken,
}