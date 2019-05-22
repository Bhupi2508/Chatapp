/******************************************************************************
 *  Execution       : default node          : cmd> nodemon serviceSignUp.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Create a service for signup
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
app.service('serviceSignUp', function ($http, $location) {

    this.signUpUser = function (data, $scope) {
        console.log("data on service register--- ", data);

        /*
        send the data and get response
        */
        $http({
            method: 'POST',
            url: 'http://localhost:4000/signup',
            data: data

        }).then(
            function successCallback(response) {
                console.log("register successfull ");
                console.log(response);
                $scope.message = "register successfull";

                /*
                after successfull registration come into login page
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
