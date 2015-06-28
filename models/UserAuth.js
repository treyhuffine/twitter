app.factory("UserAuth", function($rootScope, $location, $firebaseObject) {
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
          dateCreated: Firebase.ServerValue.TIMESTAMP,
          gravatar: CryptoJS.MD5(user.email.trim()).toString(CryptoJS.enc.Hex),
          email: user.email
        });
        return true;
      }
      return false;
    })
    .then(function(newUserRegistered) {
      if (newUserRegistered) {
        UserAuth.login(user);
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
      $location.path("/");
    })
    .catch(function(error) {
      alert(error);
    });
  };
  UserAuth.logout = function() {
    $rootScope.afAuth.$unauth();
  };
  UserAuth.setUser = function() {
    var $checkAuth = $rootScope.afAuth.$onAuth(function(authData) {
      if (authData) {
        $rootScope.userToken = authData;
        var userRef = $rootScope.fbRef.child("users").child($rootScope.userToken.uid);
        var userFBObj = $firebaseObject(userRef);
        userFBObj.$bindTo($rootScope, "currentUser");
        return true;
      } else {
        return false;
      }
    });
  };
  UserAuth.checkAuth = function() {
    return $rootScope.afAuth;
  };
  UserAuth.userList = function() {
    return $firebaseObject($rootScope.fbRef.child("users"));
  };

  return UserAuth;
});
