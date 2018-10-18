var MyApp;
(function (MyApp) {
    var userController = /** @class */ (function () {
        function userController($http, $scope, $routeParams) {
            this.$http = $http;
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.userObj = {};
            $scope.vm = this;
        }
        userController.prototype.addUser = function () {
            if (this.$routeParams.id) {
                this.$http.put('api/v1/users/' + this.$routeParams.id, this.userObj).then(function (data) {
                    if (data.status == 200) {
                        console.log("Success");
                    }
                    else {
                        console.log("Error");
                    }
                })["catch"](function (err) {
                    console.log('Error');
                });
            }
            else {
                this.$http.post('api/v1/users/', this.userObj).then(function (data) {
                    if (data.status == 200) {
                        console.log("Success");
                    }
                    else {
                        console.log("Error");
                    }
                })["catch"](function (err) {
                    console.log('Error');
                });
            }
        };
        userController.prototype.getUserById = function () {
            var _this = this;
            if (this.$routeParams.id) {
                this.$http.get('api/v1/users/byId/' + this.$routeParams.id).then(function (resp) {
                    if (resp.status == 200) {
                        _this.userObj = resp.data.data;
                    }
                    else {
                        console.log("Error");
                    }
                })["catch"](function (err) {
                    console.log('Error', err);
                });
            }
        };
        userController.prototype.getUsers = function () {
            var _this = this;
            this.$http.get('api/v1/users/').then(function (data) {
                if (data.status == 200) {
                    _this.users = data.data;
                }
                else {
                    alert('Error');
                }
            })["catch"](function (err) {
                console.log('Error');
            });
        };
        userController.prototype.deleteUser = function (_id) {
            var _this = this;
            this.$http["delete"]('api/v1/users/' + _id).then(function (data) {
                if (data.status == 200) {
                    console.log("deleted");
                    _this.getUsers();
                }
                else {
                    alert('Error');
                }
            })["catch"](function (err) {
                console.log('Error');
            });
        };
        return userController;
    }());
    var myApp = angular.module('MyApp', ['ngRoute']).config(config);
    myApp.controller('userController', userController);
    config.$inject = [
        '$routeProvider'
    ];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'display.html',
            controller: "userController"
        })
            .when('/display/addUpdateUser.html', {
            templateUrl: 'addUpdateUser.html',
            controller: "userController"
        })
            .when('/display/:id', {
            templateUrl: 'addUpdateUser.html',
            controller: "userController"
        })
            .otherwise({ redirectTo: '/' });
    }
})(MyApp || (MyApp = {}));
