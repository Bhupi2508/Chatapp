/******************************************************************************
 *  Execution       : default node          : cmd> nodemon controller.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control all the file and provide to services
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
var userService = require('../services/services');
var jwt = require('jsonwebtoken');
var gentoken = require('../middleware/token');
var sendmail = require('../middleware/sendMail');
/*
signup function and provide some validations
*/
module.exports.signup = (req, res) => {
    req.checkBody('firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.password);


    var errors = req.validationErrors();
    var response = {};
    /*
    check validations if error came then send error response
    */
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.signup(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    }
};

/*
login function check function if no error then provide to services
*/
module.exports.login = (req, res) => {
    console.log("req in controller", req.body);

    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                var token = jwt.sign({ email: req.body.email, id: data[0]._id }, secret, { expiresIn: 86400000 });
                return res.status(200).send({
                    message: data,
                    "token": token
                });
            }
        });
    }

};

/*
forgotPassword function check function if no error then provide to services
*/
module.exports.forgotPassword = (req, res) => {

    req.checkBody('email', 'Email is not valid').isEmail();
    var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    /*
    if error then show error
    */
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.forgotPassword(req.body, (err, data) => {
            var responses = {};

            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                console.log(req.body);
                responses.success = true;
                responses.result = data;

                console.log("data in controller ======== >", data[0]._id);
                /*
                create a token for user_id
                */
                var token = jwt.sign({ _id: data[0]._id }, secret, { expiresIn: 86400000 });
                const url = `http://localhost:4000/#!/resetPassword/${token}`;
                console.log("url in controller ===== >", url);

                sendmail.sendEmailFunction(url);
                res.status(200).send([{
                    "id": data[0]._id,
                    "token": token,
                },
                {
                    "Messge": "link is send on your Email id, go and check it"
                }]);

            }
        });
    }
};

/*
resetPassword function check function if no error then provide to services
*/
exports.resetPassword = (req, res) => {
    var responseResult = {};
    userService.resetPassword(req, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;

            res.status(500).send(responseResult)
        } else {
            console.log('send token after generated...');
            responseResult.success = true;

            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}


/*
getAllUser function check function if no error then provide to services
*/
exports.getAllUser = (req, res) => {
    userService.getAllUser(req, (err, data) => {
        var response = {};
        if (err) {
            console.log("error");
            return callback(err);
        } else {
            //  console.log("log==>",data);
            response.success = true;
            response.result = data;
            res.status(200).send(response);
            console.log("ok.....");


        }
    })
};
