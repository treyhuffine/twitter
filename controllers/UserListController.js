app.controller("UserListCtrl", function($scope, $rootScope, $location, UserAuth) {
  $scope.allUsers = UserAuth.userList();
  console.log($scope.allUsers);
  $scope.follow = function(clickedUser, idx) {
    clickedUser.followers = clickedUser.followers || [];
    clickedUser.followers.push($rootScope.currentUser);
    $scope.allUsers.$save(idx);
    $rootScope.currentUser.following = $rootScope.currentUser.following || [];
    $rootScope.currentUser.following.push(clickedUser);
  };
  $scope.unfollow = function(clickedUser, idx) {
    var deleteFollower = null,
        deleteFollowing = null;
    clickedUser.followers.forEach(function(e, i) {
      if (e.email === $rootScope.currentUser.email) {
        deleteFollower = i;
      }
    });
    delete clickedUser.followers[deleteFollower];
    $scope.allUsers.$save(idx);
    $rootScope.currentUser.following.forEach(function(e, i) {
      if (e.email === clickedUser.email) {
        deleteFollowing = i;
      }
    });
    delete $rootScope.currentUser.following[deleteFollowing];
  };
  $scope.isFollowing = function(listedUser) {
    var following = false;
    if ($rootScope.currentUser.following) {
      $rootScope.currentUser.following.forEach(function(e, i) {
        if (e.email === listedUser.email) {
          following = true;
        }
      });
    }
    return following;
  };
});
