app.factory("UserAuth", function($rootScope, $location, $firebaseObject, $firebaseArray) {
  function UserAuth(){
  }
  UserAuth.register = function(user) {
    return $rootScope.afAuth.$createUser({
      email: user.email,
      password: user.password
    })
    .then(function(currentData) {
      var newData;
      newData = currentData;
      if (newData.uid) {
        $rootScope.fbRef.child("users").child(newData.uid).set({
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
    // Must destroy 3-way binding here
    $rootScope.afAuth.$unauth();
  };
  UserAuth.setUser = function() {
    var $checkAuth = $rootScope.afAuth.$onAuth(function(authData) {
      if (authData) {
        $rootScope.userToken = authData;
        var userRef = $rootScope.fbRef.child("users").child($rootScope.userToken.uid);
        var thisuserFBObj = $firebaseObject(userRef);
        thisuserFBObj.$bindTo($rootScope, "currentUser");
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
    return $firebaseArray($rootScope.fbRef.child("users"));
  };

  return UserAuth;
});
