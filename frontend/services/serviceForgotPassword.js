/******************************************************************************
 *  Execution       : default node          : cmd> nodemon serviceForgotPassword.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Create a service for forgotPassword
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 20-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
app.service('serviceForgotPassword', function ($http, $location) {


    this.forgotPassword = function (data, $scope) {
        $http({
            method: 'POST',
            url: 'http://localhost:4000/forgotPassword',
            data: data,
        }).then(
            function successCallback(response) {
                console.log("forgotPassword successfull ");
                var userid = response.data.message[0]._id;
                var name = response.data.message[0].firstname;
                var token = response.data.token;
                localStorage.setItem("userid", userid);
                localStorage.setItem("name", name);
                localStorage.setItem("token",token);
               
                $scope.loginMessage = "login successfull";
            },
            function errorCallback(response) {

                console.log("register Unsuccessfull ");
                console.log(response);
                $scope.loginMessage = 'EmailId Incorrect ';


            }
        );
    }

});
