/******************************************************************************
 *  Execution       : default node          : cmd> nodemon server.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 18-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
const http = require('http');
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('../backend/routes/route');
var socket = require('socket.io');
const ioSocket = require('socket.io')(server);
var controllerChat = require('./controller/chatController')
require('dotenv').config();
app.use(cors());

/*
Parses the text as URL encoded data (which is how browsers tend to send form data from regular 
forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.
*/
app.use(bodyParser.urlencoded({ extended: true }));

/*
Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());
var expressValidator = require('express-validator')
app.use(expressValidator());

/*
server is listen 4000 port 
*/
var server = app.listen(4000, () => {
    console.log("Server is listening to port 4000");
})

/*
connect server and client uses by socket.io
*/
ioSocket.on('connection', function (socket) {
    console.log("Socket is connected")
    /*
    event is connected and listen, and socket.on wait for callback to called the function
    */
    socket.on('new message', function (message) {
        controllerChat.message(message, (err, data) => {
            if (err) {
                console.log("Error on message");
                console.log(err);
            } else {
                console.log(message + "show in server");
                /*
                emit is used to emit the message to all sockets connected to it.
                */
                ioSocket.emit('startMessage', message);
            }

        })

    })
    /*
     socket emit disconnect event which will be called whenever client disconnect
    */
    socket.on('disconnect', function () {
        console.log("socket disconnected..!!!")
    });
});


/*
calling router
*/
app.use('/', route);

/*
this is used for connect frontend to backend dynamically
*/
app.use(express.static('../frontend'));
mongoose.Promise = global.Promise;

/*
connect config and send to the mongoose connectivity
*/
const dbConfig = require('./config/dbConfig');

/*
connection to the mongo database
*/
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("successfully connected to database");
}).catch(err => {
    console.log("could not connect to the database");
    process.exit();
});

