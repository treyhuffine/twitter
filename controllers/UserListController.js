app.controller("UserListCtrl", function($scope, $rootScope, $location, UserAuth) {
  $scope.allUsers = UserAuth.userList();
});
