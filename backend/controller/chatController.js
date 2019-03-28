/******************************************************************************
 *  Execution       : default node          : cmd> nodemon chatController.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control all the file and provide to services and send response
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
var chatService = require('../services/chatServices');

/*
check the req and send to callback again
*/
try {
    module.exports.addMessage = (req, res) => {
        /*
        add messages 
        */
        chatService.addMessage(req, (err, data) => {
            var responce = {};
            if (err) {
                responce.status = false;
                responce.error = err;
                res.status(500).send(responce)
            } else {
                responce.status = true;
                responce.result = data;
               return res.status(200).send({
                  "data :" : responce,
                  "messge " : data.addMessage,
                })
            }
            // if (err) {
            //     console.log("error in controller");
            //     return callback(err);
            // } else {
            //     console.log("come back to controller => controller is working fine");
            //     return callback(null, data);
            // }
        })
    }
} catch (err) {
    console.log('error in sending messge')
}

try {

    module.exports.userMsg = (req, res) => {
        console.log(" value ")
        chatService.userMsg(req, (err, data) => {
            var responce = {};
            if (err) {
                responce.status = false;
                responce.error = err;
                res.status(500).send(responce)
            } else {
                responce.status = true;
                responce.result = data;
               return res.status(200).send(responce)
            }
        })
    }
} catch (err) {
    console.log("error in controller ")
}
