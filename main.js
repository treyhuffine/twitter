var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.controller("UserMaster", function($rootScope, $firebaseObject, UserAuth) {
  UserAuth.setUser();
  console.log($rootScope.currentUser);
  $rootScope.logout = UserAuth.logout;
})
.controller("ProfileCtrl", function($rootScope, $scope, $timeout,UserAuth, $location) {
  if (!$rootScope.userToken) {
    $location.path("/login");
  }
});
