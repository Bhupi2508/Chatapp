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
                get value from the data and by using GET method
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
                    console.log("response: ", response);

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

            /*
            create a array and push all the message in this array
            */
            var arr = [];
            var usertoken = localStorage.getItem('token');
            $http({
                /*
                assigning value to http proprties from the data
                */
                method: 'GET',
                url: 'http://localhost:4000/userMsg',
                headers: {
                    'token': usertoken,
                }
            }).then(
                /*
                get response from the database
                */
                function successCallback(response) {
                    console.log("response : ", response);
                    console.log("response data message", response.data.message);
                    console.log("response data", response.data);
                    console.log("message", message);
                    console.log("response data result", response.data.result);
                    console.log("response data result", response.data.result.length);

                    /*
                    create a loop for all the message history
                    */
                    for (let i = 0; i < (response.data.result.length); i++) {
                        var a = response.data.result[i];

                        /*
                        condition for correct user history and send them
                        */
                        if (((localStorage.getItem('userid') == a.senderId) && (localStorage.getItem('ruserId') == a.receiverId)) || ((localStorage.getItem('userid') == a.receiverId && localStorage.getItem('ruserId') == a.senderId))) {

                            /*
                            print in full code
                            */
                            console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderId, " local rcvrid is ", localStorage.getItem('ruserId'), "  reciver is ", a.receiverId);

                            /*
                            pushing all message to array
                            */
                            arr.push(a);
                        }

                    }
                    /*
                    now all the messages store in users history
                    */
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