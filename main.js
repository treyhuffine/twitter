var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.factory("UserAuth", function($rootScope, $location, $firebaseObject) {
  function UserAuth(){
  }

  UserAuth.register = function(user) {
    return $rootScope.afAuth.$createUser({
      email: user.email,
      password: user.password
    })
    .then(function(data) {
      if (data.uid) {
        $rootScope.fbRef.child("users").child(data.uid).set({
          fullName: user.fullName,
          username: user.username,
          email: user.email
        });
        return true;
      }
      return false;
    })
    .then(function(newUserRegistered) {
      if (newUserRegistered) {
        Auth.login(user);
      }
    })
    .catch(function(error) {
      alert(error);
    });
  };
  UserAuth.login = function(user) {
    $rootScope.afAuth.$authWithPassword({
      email: user.email,
      password: user.password
    })
    // .then(function() {
    //   UserAuth.setUser();
    // })
    .then(function() {
      $location.path("/welcome");
    })
    .catch(function(error) {
      alert(error);
    });
  };
  UserAuth.logout = function() {
    $rootScope.afAuth.$unauth();
    $location.path("/");
  };
  UserAuth.setUser = function() {
    $rootScope.afAuth.$onAuth(function(authData) {
      if (authData) {
        console.log(authData);
        $rootScope.activeUser = authData;
        var userRef = $rootScope.fbRef.child("users").child($rootScope.activeUser.uid);
        var userFBObj = $firebaseObject(userRef);
        userFBObj.$bindTo($rootScope, "currentUser");
      }
    });
  }

  return UserAuth;
})
.controller("LoggedInUser", function($rootScope, $firebaseObject, UserAuth) {
  UserAuth.setUser();
})
.controller("AuthCtrl", function($scope, $rootScope, $location, UserAuth) {
  if ($rootScope.authData) {
    $location.path("/welcome");
  }
  var tempLogin;
  $scope.registerUser = function() {
    tempLogin = $scope.newUser;
    $scope.newUser = {};
    UserAuth.register(tempLogin);
  };
  $scope.loginUser = function() {
    tempLogin = $scope.currentUser;
    $scope.currentUser = {};
    UserAuth.login(tempLogin);
  };
})
.controller("WelcomeCtrl", function($rootScope, $scope, $timeout,UserAuth, $location) {
  $scope.logout = UserAuth.logout;
});
