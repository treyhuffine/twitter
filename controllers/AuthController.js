app.controller("AuthCtrl", function($scope, $rootScope, $location, UserAuth) {
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
