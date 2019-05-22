/******************************************************************************
 *  Execution       : default node          : cmd> nodemon serviceLogin.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Create a service for login
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
app.service('serviceLogin', function ($http, $state) {


    this.login = function (data, $scope) {
        /*
        send the data and get response
        */
        $http({
            method: 'POST',
            url: 'http://localhost:4000/login',
            data: data,
        }).then(
            function successCallback(response) {

                console.log("Login successfull at serviceLogin in client side");
                var userid = response.data.message[0]._id;
                var name = response.data.message[0].firstname;
                var token = response.data.token;
                var email = response.data.email;
                localStorage.setItem("userid", userid);
                localStorage.setItem("name", name);
                localStorage.setItem("token", token);
                localStorage.setItem("email", email);

                /*
                after login successfull go to direct homePage
                */
                $state.go('homePage');
            },
            function errorCallback(response) {
                console.log("register Unsuccessfull please check your username or password");
                console.log(response);
                $scope.loginMessage = 'EmailId or Password Incorrect ';


            }
        );
    }

});
