/******************************************************************************
 *  Execution       : default node          : cmd> nodemon Login_controller.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control the login functions
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
app.controller('controlLogin', function($scope, $location, serviceLogin){

    $scope.login= function(){
        var data = {
            'email':$scope.email,
            'password':$scope.password
        }
        $scope.go = function(path) {
            $location.path("/signup");
          };
          $scope.go2 = function(path) {
            $location.path("/forgotPassword");
          };
         console.log(data);
         
        serviceLogin.login(data);
    }
});