var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.controller("UserMaster", function($rootScope, $firebaseObject, UserAuth) {
  UserAuth.setUser();
  $rootScope.logout = UserAuth.logout;
})
.controller("WelcomeCtrl", function($rootScope, $scope, $timeout,UserAuth, $location) {
  $scope.logout = UserAuth.logout;
});
