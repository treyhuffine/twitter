var app = angular.module("lyve", ["ngRoute", "firebase"]);

app
.constant("fbUrl", "https://lyve.firebaseio.com/")
.run(function($rootScope, $firebaseAuth, $window, fbUrl) {
  $rootScope.fbRef = new $window.Firebase(fbUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRef);
})
.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "MainCtrl",
      templateUrl: "main.html"
    })
    .when("/welcome", {
      controller: "WelcomeCtrl",
      templateUrl: "welcome.html"
    })
    .otherwise({
      redirectTo: "/"
    });
})
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
    .then(function() {
      $location.path("/welcome");
    })
    .catch(function(error) {
      alert(error);
    });
  };
  UserAuth.logout = function() {
    $rootScope.afAuth.$unauth();
  };
  return UserAuth;
})
.controller("LoggedInUser", function($rootScope, $firebaseObject) {
  $rootScope.afAuth.$onAuth(function(authData) {
    if (authData) {
      console.log(authData);
      $rootScope.activeUser = authData;
      var userRef = $rootScope.fbRef.child("users").child($rootScope.activeUser.uid);
      var userFBObj = $firebaseObject(userRef);
      userFBObj.$bindTo($rootScope, "currentUser");
    }
  });
})
.controller("MainCtrl", function($scope, $rootScope, $location, UserAuth) {
  if ($rootScope.authData) {
    $location.path("/welcome");
  }
  $scope.registerUser = function() {
    UserAuth.register($scope.newUser);
  };
  $scope.loginUser = function() {
    UserAuth.login($scope.currentUser);
  };
})
.controller("WelcomeCtrl", function($rootScope, $scope, UserAuth, $location) {
  if ($rootScope.currentUser) {
    $scope.logout = UserAuth.logout;
  } else {
    $location.path("/")
  }
});
