/******************************************************************************
 *  Execution       : default node          : cmd> nodemon ForgotPassword_controller.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control the forgot password functions
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
app.controller('controlForgotPassword', function ($scope, serviceForgotPassword) {

    $scope.forgotPassword = function () {
        var data = {
            'email': $scope.email,    
        }
        $scope.go = function(path) {
          //  $location.path("/login");
          };
        serviceForgotPassword.forgotPassword(data, $scope);
    }
});