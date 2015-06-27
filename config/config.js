app.config(function($routeProvider) {
  console.log("config");
  $routeProvider
    .when("/", {
      controller: "WelcomeCtrl",
      templateUrl: "views/welcome.html"
    })
    .when("/login", {
      controller: "AuthCtrl",
      templateUrl: "views/auth.html"
    })
    .otherwise({
      redirectTo: "/login"
    });
});
