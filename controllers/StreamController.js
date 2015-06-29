app.controller("StreamCtrl", function($scope, $rootScope, $location, UserAuth, currentAuth, $firebaseArray) {
  var postRef = $rootScope.fbRef.child("posts");
  var query = postRef.orderByChild("dateCreated");
  $scope.postArray = $firebaseArray($rootScope.postRef);
  $scope.isFollowing = function() {
    if ($rootScope.currentUser && $rootScope.currentUser.following) {
      var isFollowing = false;
      for (var k in $rootScope.currentUser.following) {
        for (var i = 0; i < $scope.postArray.length; i++) {
          console.log($rootScope.currentUser.following[k].gravatar);
          console.log($scope.postArray[i].postComposerGravatar);
          if ($scope.postArray[i].postComposerGravatar === $rootScope.currentUser.following[k].gravatar) {
            isFollowing = true;
          }
        }
      }
      return isFollowing;
    }
  };
});
