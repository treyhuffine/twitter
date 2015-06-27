app.controller("AuthCtrl", function($scope, $rootScope, $location, UserAuth) {
  if ($rootScope.authData) {
    $location.path("/");
  }
  var tempLogin;
  $scope.registerUser = function() {
    tempLogin = $scope.newUser;
    $scope.newUser = {};
    UserAuth.register(tempLogin);
  };
  $scope.loginUser = function() {
    tempLogin = $scope.currentUser;
    $scope.currentUser = {};
    UserAuth.login(tempLogin);
  };
});
