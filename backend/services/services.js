/******************************************************************************
 *  Execution       : default node          : cmd> nodemon service.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : define a business logics and provide to main function
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 22-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
var usermodel = require('../app/models/userModels')

/*
for signup 
*/
exports.signup = (req, callback) => {
    usermodel.signup(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for login 
*/
exports.login = (req, callback) => {
    usermodel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for forgot password
*/
exports.forgotPassword = (req, callback) => {
    usermodel.forgotPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for reset password
*/
exports.resetPassword = (req, callback) => {
    usermodel.resetPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for updated password
*/
exports.updatePassword = (req, callback) => {
    usermodel.updatePassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for new user
*/
module.exports = {
    save () {
        const newUser = new user({

            "firstname": body.firstname,
            "lastname": body.lastname,
            "email": body.email,
            "password": hash(body.password)
        });
        return newUser;
    }
}

/*
for retrive the data
*/
exports.getAllUser = (req, callback) => {
    usermodel.getAllUser(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}