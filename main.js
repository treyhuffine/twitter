var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.controller("UserMaster", function($rootScope, $firebaseObject, UserAuth, Post) {
  UserAuth.setUser();
  console.log($rootScope.currentUser);
  $rootScope.logout = UserAuth.logout;
})
.controller("ProfileCtrl", function($rootScope, $scope, $timeout, UserAuth, $location, Post) {
  if (!$rootScope.userToken) {
    $location.path("/login");
  }
  $scope.submitPost = function() {
    Post.composePost($scope.postText);
  };
  var test = Post.showCurrentUserPosts();
  console.log(test);
  // test.$bindTo($scope, "currentUserPosts");
});
