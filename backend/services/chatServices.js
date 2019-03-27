/******************************************************************************
 *  Execution       : default node          : cmd> nodemon chatService.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : define a business logics and provide to main function
 *                    for chat services and check the conditions
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 25-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
var chatModel = require('../app/models/chatModel')

/*
send message or add message by sender
*/
exports.addMessage = (req, callback) => {
    console.log("Service request")
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            console.log("err on service file", err);
            callback(err)
        } else {
            console.log("data on service file", data);
            callback(null, data)
        }

    })
}

/*
for user message which has recived
*/
exports.userMessage = (req, callback) => {
    console.log("user request")
    chatModel.UserMsg(req, (err, data) => {
        if (err) {
            console.log("chat services is not working");
            callback(err);
        } else {
            console.log("chat service is working fine")
            callback(null, data);
        }
    })
}
