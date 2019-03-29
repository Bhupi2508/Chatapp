/******************************************************************************
 *  Execution       : default node          : cmd> nodemon serviceResetPassword.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Create a service for reset password
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
app.service('serviceResetPassword', function ($http, $location) {

    this.resetPasswordUser = function (data, $scope) {
        console.log("data on service register--- ", data);

        /*
        send the data and get response
        */
        $http({
            method: 'POST',
            url: 'http://localhost:4000/resetPassword',
            data: data

        }).then(
            function successCallback(response) {
                console.log("register successfull ");
                console.log(response);
                $scope.message = "register successfull";

                /*
                after reset password come into the login page
                */
                $location.path('/login');

            },
            function errorCallback(response) {
                console.log("register Unsuccessfull ");
                $scope.message = response.data.message.message;

            }
        );
    }
});
