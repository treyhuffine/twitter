var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.controller("UserMaster", function($rootScope, $firebaseObject, UserAuth, Post) {
  UserAuth.setUser();
  $rootScope.logout = UserAuth.logout;
})
.controller("ProfileCtrl", function($rootScope, $scope, $timeout, UserAuth, $location, Post) {
  if (!$rootScope.userToken) {
    $location.path("/login");
  }
  $scope.submitPost = function() {
    Post.composePost($scope.postText);
  };
  $scope.currentUserPosts = Post.showCurrentUserPosts();
});
