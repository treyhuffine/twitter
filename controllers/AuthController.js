app.controller("AuthCtrl", function($scope, $rootScope, $location, UserAuth) {
  if ($rootScope.userToken) {
    console.log($rootScope.currentUser.username);
    $location.path("/user/" + $rootScope.currentUser.username);
  }
  var tempLogin;
  $scope.registerUser = function() {
    tempLogin = $scope.newUser;
    $scope.newUser = {};
    UserAuth.register(tempLogin);
  };
  $scope.loginUser = function() {
    tempLogin = $scope.returningUser;
    $scope.returningUser = {};
    UserAuth.login(tempLogin);
  };
});
