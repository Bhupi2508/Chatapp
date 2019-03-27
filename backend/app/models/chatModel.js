/******************************************************************************
 *  Execution       : default node          : cmd> nodemon chatModels.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : chat models for chatting between two users
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
var mongoose = require('mongoose');
var schema = mongoose.Schema;

/*
define a schema for chating users
*/
var chatSchema = new schema({
    senderId: {
        type: String
    },

    senderName: {
        type: String
    },

    receiverId: {
        type: String
    },

    receiverName: {
        type: String
    },

    messageId: {
        type: String
    }
},
    {
        timestamps: true

    });

/*
create a chatModel function
*/
function chatModel() { }
var chat = mongoose.model('chatInfo', chatSchema)
try {
    chatModel.prototype.addMessage = (chatData, callback) => {
        console.log('Data', chatData.senderId)

        const newMessage = new chat({
            senderId: chatData.senderId,
            senderName: chatData.senderName,
            receiverId: chatData.receiverId,
            receiverName: chatData.receiverName,
            messageId: chatData.messageId
        });
        console.log("create a message ", newMessage);
        newMessage.save((err, result) => {
            if (err) {
                console.log('!error, Data not filled', err);
                return callback(err);
            } else {
                console.log('chat data save successfullly')
                return callback(null, result);
            }
        });
    }
} catch (err) {
    console.log('result not found')
}

/*
user message 
*/
try {
    chatModel.prototype.UserMsg = (req, callback) => {
        chat.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data);
            }
        })
    }
} catch (err) {
    console.log('Data not find')
}

module.exports = new chatModel();