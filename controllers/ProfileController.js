app.controller("ProfileCtrl", function($rootScope, $scope, $timeout, UserAuth, $location, Post) {
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
