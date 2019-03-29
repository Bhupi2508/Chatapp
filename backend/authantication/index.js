/******************************************************************************
 *  Execution       : default node          : cmd> nodemon index.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : For created token
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 21-mar-2019
 *
 ******************************************************************************/
/*
required files
*/

var jwt = require('jsonwebtoken');
var secret = "adcgfft";
try {
    var auth = function (req, res, next) {
        console.log("In auth");
        var token = req.headers["token"];
        console.log(" token is in auth, ====>", token);
        var response = {
            'message': "Unauthorised user here "
        };
        /*
        verify the token and then send response to sendMail
        */
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                console.log(err)
                return res.status(401).send(response);
            }
            else {
                console.log("Decoded Data ===== > ", decoded);
                req.decoded = decoded;
                next();
            }
        });
    }
}
catch (err) {
    console.log("found error in generating token")
}
module.exports = { auth };