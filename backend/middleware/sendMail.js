/******************************************************************************
 *  Execution       : default node          : cmd> nodemon sendMail.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : For sending mail
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
const nodemailer = require('nodemailer');

exports.sendEmailFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        /*
        email and password are hidden by using of env file
        */
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
    });

    const mailOptions = {
        from: process.env.email,
        to: 'bhupendrasingh.ec18@gmail.com',
        subject: 'Chat-app password reset link ',
        text: 'Please go through the e-mail verifaction link provided in this mail:\n\n' + url
    };
    /*
    send mail from given mail id, by using authriozation info
    */
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("is it is invalid");
            console.log("error on sending mail--", err)
        }
        else
            console.log('result of sending mail-- ', info);
    });

}