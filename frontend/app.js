/******************************************************************************
 *  Execution       : default node          : cmd> nodemon app.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : set routing and provide to controller
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
var app = angular.module("chatapp", ['ui.router', 'btford.socket-io'])
app.config(function ($stateProvider, $urlRouterProvider) {

    /*
    call login html file and send to controller
    */
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templet/LoginForm.html',
        controller: "controlLogin"

    })

    /*
    call signup html file and send to controller
    */
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'templet/SignUp.html',
        controller: 'controlSignup'
    })

    /*
    call forgot password html file and send to controller
    */
    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templet/ForgotPassword.html',
        controller: 'controlForgotPassword'

    })
    /*
    call reset password html file and send to controller
    */
    $stateProvider.state('resetPassword', {
        url: '/resetPassword/:token',
        templateUrl: 'templet/ResetPassword.html',
        controller: 'controlResetPassword'

    });

    /*
    call Homepage html file and send to controller
    */
    $stateProvider.state('homePage', {
        url: '/homePage',
        templateUrl: 'templet/HomePage.html',
        controller: 'chatController'

    });

    /*
    Default login
    */
    $urlRouterProvider.otherwise('login');

});

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);