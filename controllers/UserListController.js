app.controller("UserListCtrl", function($scope, $rootScope, $location, UserAuth) {
  $scope.allUsers = UserAuth.userList();
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
    for (var k in $rootScope.currentUser.following) {
      if ($rootScope.currentUser.following[k].email === clickedUser.email) {
        deleteFollowing = k;
      }
    }
    delete $rootScope.currentUser.following[deleteFollowing];
  };
  $scope.isFollowing = function(listedUser) {
    var following = false;
    if ($rootScope.currentUser.following) {
      for (var k in $rootScope.currentUser.following) {
        if ($rootScope.currentUser.following[k].email === listedUser.email) {
          following = true;
        }
      }
    }
    return following;
  };
});
