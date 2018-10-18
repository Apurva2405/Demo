
module MyApp {
    class userController {
        private users: Array<Object>;
        private userObj: Object;
        
        constructor(private $http: ng.IHttpService, private $scope: ng.IScope,private $routeParams:ng.route.IRouteParamsService) {
            this.userObj = {};
            $scope.vm = this;
        }

        addUser(){
            if (this.$routeParams.id){
                this.$http.put('api/v1/users/'+ this.$routeParams.id, this.userObj).then((data) => {
                    if (data.status == 200) {
                        console.log("Success");
                    } else {
                        console.log("Error");
                    }
                }).catch((err) => {
                    console.log('Error');
    
                });

            }
            else{
                this.$http.post('api/v1/users/', this.userObj).then((data) => {
                    if (data.status == 200) {
                        console.log("Success");
                    } else {
                        console.log("Error");
                    }
                }).catch((err) => {
                    console.log('Error');
    
                });

            }


        }
        getUserById() {
            if (this.$routeParams.id) {
                this.$http.get('api/v1/users/byId/'+ this.$routeParams.id).then((resp) => {
                    if (resp.status == 200) {
                        this.userObj = resp.data.data;
                    } else {
                        console.log("Error");
                    }
                }).catch((err) => {
                    console.log('Error', err);
                });
            }
        }

        getUsers() {
            this.$http.get('api/v1/users/').then((data) => {
                    if (data.status == 200) {
                        this.users = data.data;
                    } else {
                        alert('Error');
                    }    
            }).catch((err) => {
                console.log('Error');
            });


            
            

        }
        deleteUser(_id: string) {
            this.$http.delete('api/v1/users/'+ _id).then((data) => {
                if (data.status == 200) {
                   console.log("deleted");
                   this.getUsers();
                } else {
                    alert('Error');
                }    
        }).catch((err) => {
            console.log('Error');
        });


        }
    }


    var myApp = angular.module('MyApp', ['ngRoute']).config(config);
    myApp.controller('userController', userController);
    config.$inject = [
        '$routeProvider'
    ];

    function config($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'display.html',
                controller: "userController"
            })
            
            .when('/display/addUpdateUser.html' ,{
                templateUrl: 'addUpdateUser.html',
                controller: "userController"
            })

            .when('/display/:id', {
                templateUrl: 'addUpdateUser.html',
                controller: "userController"
            })
           .otherwise({ redirectTo: '/' });

    }
}