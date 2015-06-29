app.controller("ProfileCtrl", function($rootScope, $scope, $timeout, UserAuth, $location, Post, currentAuth) {
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
  $scope.getFollowersCount = function() {
    if ($rootScope.currentUser && $rootScope.currentUser.followers) {
      return $rootScope.currentUser.followers.length;
    } else {
      return 0;
    }
  };
  $scope.getFollowingCount = function() {
    if ($rootScope.currentUser && $rootScope.currentUser.following) {
      return $rootScope.currentUser.following.length;
    } else {
      return 0;
    }
  };
  $scope.currentUserPosts = Post.showCurrentUserPosts();
});
