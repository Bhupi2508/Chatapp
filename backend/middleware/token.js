/******************************************************************************
 *  Execution       : default node          : cmd> nodemon token.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : For generate a token
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
const jwt = require('jsonwebtoken');
module.exports = {
    /*
    Generate a token with the help of payload
    */
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn: '2h' }) //expires in two hours
        const obj = {
            success: true,
            message: 'Token Generated !!',
            token: token
        }
        return obj;
    }
}