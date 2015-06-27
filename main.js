'use strict';

var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.constant("fbUrl", "https://lyve.firebaseio.com/")
.run(function($rootScope, $firebaseAuth, $window, fbUrl) {
  $rootScope.fbRef = new $window.Firebase(fbUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRef);
})
.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "MainCtrl",
      templateUrl: "main.html"
    })
    .when("/welcome", {
      controller: "WelcomeCtrl",
      templateUrl: "welcome.html"
    })
    .otherwise({
      redirectTo: "/"
    });
})
.controller("MainCtrl", function($scope, $rootScope) {
  var auth = $rootScope.afAuth;
  $scope.registerUser = function() {
    auth.$createUser({
      email: $scope.newUser.email,
      password: $scope.newUser.password
    })
    .then(function(data) {
      $rootScope.fbRef.child("users").child(data.uid).set({
        fullName: $scope.newUser.fullName,
        username: $scope.newUser.username,
        email: $scope.newUser.email
      });
    })
    .catch(function(error) {
      console.log(error);
    });
    $scope.newUser = {};
  };
  $scope.loginUser = function() {
    auth.$authWithPassword({
      email: $scope.currentUser.email,
      password: $scope.currentUser.password
    })
    .then(function(authData) {
      console.log(authData);
    })
    .catch(function(error) {
      console.log(error)
    });
    $scope.currentUser = {};
  }
});
