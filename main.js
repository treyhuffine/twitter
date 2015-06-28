var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.controller("UserMaster", function($rootScope, $firebaseObject, UserAuth, Post, $location) {
  UserAuth.setUser();
  $rootScope.logout = function() {
    UserAuth.logout();
    $location.path("/login");
  };
})
.controller("ProfileCtrl", function($rootScope, $scope, $timeout, UserAuth, $location, Post) {
  if (!$rootScope.userToken) {
    $location.path("/login");
  }
  var postCharacterLimit = 365;
  $scope.postText = "";
  $scope.submitPost = function() {
    Post.composePost($scope.postText);
    $scope.postText = "";
  };
  $scope.remainingCharacters = function() {
    return postCharacterLimit - $scope.postText.length;
  };
  $scope.isPostMaxed = function() {
    return $scope.remainingCharacters() < 0;
  };
  $scope.currentUserPosts = Post.showCurrentUserPosts();
});
