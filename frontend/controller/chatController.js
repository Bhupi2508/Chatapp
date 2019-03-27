/******************************************************************************
 *  Execution       : default node          : cmd> nodemon chatController.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control the chat application from socket and connections
 *                    and given response to the service
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 26-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = "";
    /*
    create a array for all users,
    current user name, id and receiver user name get from storage
    */
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    $scope.currUser = localStorage.getItem('userid');
    $scope.recieverName = localStorage.getItem('rusername');
    $scope.recieverId = localStorage.getItem('ruserId');

    /*
    get a token from data
    */
    var token = localStorage.getItem("token");
    console.log("token : ", token)
    if (token === null) {
        /*
        if the tocken is null then go to login page
        */
        $state.go('login');
    }

    try {
        SocketService.on('startMessage', (message) => {
            /*
            events listening
            */
            if (localStorage.getItem('userid') == message.senderId || (localStorage.getItem('userid') == message.recieverId && localStorage.getItem('ruserId') == message.senderId)) {
                if ($scope.allUserArr === undefined) {
                    /*
                    assighning message to variable
                    */
                    $scope.allUserArr = message;
                } else {
                    /*
                    if new message is there then push in array
                    */
                    $scope.allUserArr.push(message);
                }
            }
        })

    } catch (err) {
        console.log("!error, finding a message")
    }
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope, token);
    }
    $scope.getAllUsers();
    $scope.person = function (userData) {
        /*
        select person from list or Data
        */
        $scope.allUserArr = '';
        localStorage.setItem('rusername', userData.firstname);
        localStorage.setItem('ruserId', userData._id);
        /*
         getting data from localstorage
        */
        $scope.recieverUserName = localStorage.getItem('rusername');
        $scope.getUserMsg();
    }
    /*
    get all message from data
    */
    $scope.getUserMsg = function () {
        console.log("function calling....");
        chatServices.getUserMsg($scope);
    }
    $scope.getUserMsg();

    try {
        /*
        send message function
        */
        $scope.sendmessage = function () {
            var msg = {
                'senderId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'recieverId': localStorage.getItem('ruserId'),
                'recieverName': localStorage.getItem('rusername'),
                'message': $scope.message
            };
            $scope.message = '';
            /*
            emittin the message to the browser
            */
            SocketService.emit('createMessage', msg);
        }
    }
    catch (err) {
        console.log("!error in sending message to the reciever")
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            /*
            after logout return back to logout page
            */
            $state.go('login')
        }
    }
    catch (err) {
        console.log("error in logging out")
    }

})