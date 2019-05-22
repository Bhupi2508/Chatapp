/******************************************************************************
 *  Execution       : default node          : cmd> nodemon resetPassword_controller.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control the reset password functions
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
app.controller('controlResetPassword', function ($scope, serviceResetPassword) {

    // for registration form
    $scope.resetPassword = function () {
        var user = {
            'Password': $scope.password,
        }

        console.log("register calling", user);
        if ($scope.password != $scope.password) {
            $scope.message = "password not match ";
        } else {
            serviceResetPassword.resetPasswordUser(user, $scope);
        }
    }
});