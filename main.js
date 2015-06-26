'use strict';

var app = angular.module("lyve", ["firebase", "ngRoute"]);

app
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
.controller("MainCtrl", function($scope) {
});
