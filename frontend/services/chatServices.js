/******************************************************************************
 *  Execution       : default node          : cmd> nodemon chatServices.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Create a service for chatting
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
app.service('chatServices', function ($http) {
    try {
        this.getAllUser = function ($scope, usertoken) {
            $http({
                /*
                assigning value to http proprties
                */
                method: 'GET',
                url: 'http://localhost:4000/getAllUser',
                headers: {
                    'token': usertoken,
                }
            }).then(

                /*
                call back function of http sevice
                */
                function successCallback(response) {
                    $scope.allUser = response.data.result;
                    console.log("all data : ", response.data.result);
                    console.log("response: ",response);
                    
                },
                function errorCallback(response) {
                    console.log(" register Unsuccessfull ");
                    console.log("all data : ", response);
                }
            );
        }
    }
    catch (err) {
        console.log("error found here in getting users")
    }

    /*
    for another users who receive message
    */
    try {
        this.userMsg = function ($scope) {
            var arr = [];
            var usertoken = localStorage.getItem('token');
            $http({
                /*
                assigning value to http proprties
                */
                method: 'GET',
                url: 'http://localhost:4000/userMsg',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log(response.data.message);

                    for (let i = 0; i < (response.data.message); i++) {  //(response.data.message).length *change was done
                        a = response.data.message[i];

                        if (((localStorage.getItem('userid') == a.senderId) && (localStorage.getItem('ruserId') == a.recieverId)) || ((localStorage.getItem('userid') == a.recieverId && localStorage.getItem('ruserId') == a.senderId))) {
                            /*
                            print in full code
                            */
                            console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderId, " local rcvrid is ", localStorage.getItem('ruserId'), "  reciver is ", a.recieverId);

                            /*
                            pushing all message to array
                            */
                            arr.push(a);
                        }

                    }
                    $scope.allUserArr = arr;
                    console.log("Users msg successfull ", arr);

                },
                function errorCallback(response) {
                    console.log("Unsuccessfull ");
                    console.log(response);

                }
            );
        }
    }
    catch (err) {
        console.log("found error in getting message")
    }

})