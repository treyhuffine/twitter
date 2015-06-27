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
    console.log(user);
    return $rootScope.afAuth.$createUser({
      email: user.email,
      password: user.password
    })
    .then(function(data) {
      if (data.uid) {
        $rootScope.fbRef.child("users").child(data.uid).set({
          fullName: user.fullName,
          username: user.username,
          email: user.email
        });
        return true;
      }
      return false;
    })
    .then(function(newUserRegistered) {
      if (newUserRegistered) {
        Auth.login(user);
      }
    })
    .catch(function(error) {
      alert(error);
    });
  };
  Auth.login = function(user) {
    $rootScope.afAuth.$authWithPassword({
      email: user.email,
      password: user.password
    })
    .catch(function(error) {
      alert(error);
    });
  };
  Auth.monitorAuth = function() {
    $rootScope.afAuth.$onAuth(function(authData) {
      if (authData) {
        $rootScope.authData = authData;
        $rootScope.fbRef.child(authData.uid).once("value", function(snapshot) {
          $rootScope.currentUser = snapshot.val();
        });
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
  if ($rootScope.authData) {
    $location.path("/welcome");
  }
  Auth.monitorAuth();
  $scope.registerUser = function() {
    Auth.register($scope.newUser);
  };
  $scope.loginUser = function() {
    Auth.login($scope.currentUser);
  };
})
.controller("WelcomeCtrl", function($scope, Auth) {
  $scope.logout = Auth.logout;
});
