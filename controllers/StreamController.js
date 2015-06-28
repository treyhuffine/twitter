app.controller("StreamCtrl", function($scope, $rootScope, $location, UserAuth, currentAuth, $firebaseArray) {
  var postRef = $rootScope.fbRef.child("posts");
  var query = postRef.orderByChild("dateCreated");
  $scope.postArray = $firebaseArray(query);
});
