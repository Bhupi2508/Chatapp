/******************************************************************************
 *  Execution       : default node          : cmd> nodemon SignUp_controller.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control the signup functions
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
app.controller('controlSignup', function ($scope, $location, serviceSignUp) {

    /*
     for registration form
    */
     $scope.signup = function () {
        var user = {
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'email': $scope.email,
            'password': $scope.password
            
        }
        $scope.go = function(path) {
            $location.path("/login");
          };

        console.log("register calling", user);
        if ($scope.password != $scope.password) {
            $scope.message = "password does not match ";
        } else {
            serviceSignUp.signUpUser(user, $scope);
            
        }
    }
});

