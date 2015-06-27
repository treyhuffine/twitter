app.config(function($routeProvider) {
  console.log("config");
  $routeProvider
    .when("/", {
      controller: "ProfileCtrl",
      templateUrl: "views/profile.html"
    })
    .when("/login", {
      controller: "AuthCtrl",
      templateUrl: "views/auth.html"
    })
    .otherwise({
      redirectTo: "/login"
    });
});
