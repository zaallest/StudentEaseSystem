//desc import bcrypt
//Its a tool that enable password hassing
//
const  bcrypt = require('bcryptjs')

//Declare a fmethod to get password and hash it..
function hashPassword (password) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

//Compare the user login password and password in the database..
function comparePasswords(loginPassword, hashedPassword){
    const result = bcrypt.compareSync(loginPassword, hashedPassword)
    return result
}
module.exports = {
    hashPassword,
    comparePasswords,
}