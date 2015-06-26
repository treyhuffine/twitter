'use strict';

var app = angular.module("lyve", ["firebase", "ngRoute"]);

app
.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "MainCtrl",
      templateUrl: "main.html"
    })
    .otherwise({
      redirectTo: "/"
    });
})
.controller("MainCtrl", function($scope) {
  console.log("Hello world and stuff");
});
