app.config(function($routeProvider) {
  console.log("config");
  $routeProvider
    .when("/", {
      controller: "AuthCtrl",
      templateUrl: "/views/auth.html"
    })
    .when("/welcome", {
      controller: "WelcomeCtrl",
      templateUrl: "welcome.html"
    })
    .otherwise({
      redirectTo: "/"
    });
});
