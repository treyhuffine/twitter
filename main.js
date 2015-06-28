var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.controller("UserMaster", function($rootScope, $firebaseObject, UserAuth, Post, $location, $route) {
  UserAuth.setUser();
  $rootScope.logout = function() {
    UserAuth.logout();
    $location.path("/login");
  };
  $rootScope.goHome = function() {
    $location.path("/");
  };
});
