app.run(function($rootScope, $firebaseAuth, $window, $location, fbUrl) {
  $rootScope.fbRef = new $window.Firebase(fbUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRef);
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });

});
