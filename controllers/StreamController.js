app.controller("StreamCtrl", function($scope, $rootScope, $location, UserAuth, currentAuth, $firebaseArray) {
  var postRef = $rootScope.fbRef.child("posts");
  var query = postRef.orderByChild("dateCreated");
  $scope.postArray = $firebaseArray($rootScope.postRef);
  $scope.isFollowing = function(postUser) {
    if ($rootScope.currentUser && $rootScope.currentUser.following) {
      var isFollowing = false;
      for (var k in $rootScope.currentUser.following) {
        if (postUser.postComposerGravatar === $rootScope.currentUser.following[k].gravatar) {
          isFollowing = true;
        }
      }
      return isFollowing;
    }
  };
});
