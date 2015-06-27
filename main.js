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
.factory("Auth", function($rootScope, $location) {
  function Auth(){
  }

  Auth.register = function(user) {

  };
  Auth.login = function(user) {
    $rootScope.afAuth.$authWithPassword({
      email: user.email,
      password: user.password
    })
    .then(function(authData) {
      console.log(authData);
      // Use authData.uid to get current user information
    })
    .catch(function(error) {
      console.log(error)
    });
  };
  Auth.monitorAuth = function() {
    $rootScope.afAuth.$onAuth(function(authData) {
      console.log(authData);
      if (authData) {
        $rootScope.authData = authData;
        console.log($rootScope.fbRef.child(authData.uid));
        $rootScope.fbRef.child(authData.uid).once("value", function(snapshot) {
          console.log(snapshot.val());
          $rootScope.currentUser = snapshot.val();
        });
        console.log($rootScope.currentUser);
        $location.path("/welcome");
      }
    });
  };
  Auth.logout = function() {
    $rootScope.afAuth.$unauth();
  };
  return Auth;
})
.controller("MainCtrl", function($scope, $rootScope, $location, Auth) {
  var auth = $rootScope.afAuth;
  if ($rootScope.authData) {
    $location.path("/welcome");
  }
  $scope.registerUser = function() {
    auth.$createUser({
      email: $scope.newUser.email,
      password: $scope.newUser.password
    })
    .then(function(data) {
      console.log($scope.newUser);
      $rootScope.fbRef.child("users").child(data.uid).set({
        fullName: $scope.newUser.fullName,
        username: $scope.newUser.username,
        email: $scope.newUser.email
      });
    })
    .catch(function(error) {
      console.log(error);
    });
    auth.$onAuth(function(authData) {
      $rootScope.authData = authData;
      $rootScope.fbRef.once("value", function(snapshot) {
        console.log(snapshot.val());
      });
      $location.path("/welcome");
    });
  };
  $scope.loginUser = function() {
    Auth.login($scope.currentUser);
  };
  Auth.monitorAuth();
})
.controller("WelcomeCtrl", function($scope, Auth) {
  $scope.logout = Auth.logout;
});
