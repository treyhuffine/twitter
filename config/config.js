app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "ProfileCtrl",
      templateUrl: "views/profile.html",
      resolve: {
        "currentAuth": ["UserAuth", function(UserAuth) {
          return UserAuth.checkAuth().$waitForAuth();
        }]
      }
    })
    .when("/login", {
      controller: "AuthCtrl",
      templateUrl: "views/auth.html",
      resolve: {
        "currentAuth": ["UserAuth", function(UserAuth) {
          return UserAuth.checkAuth().$waitForAuth();
        }]
      }
    })
    .when("/list", {
      controller: "UserListCtrl",
      templateUrl: "views/list.html"
    })
    .otherwise({
      redirectTo: "/login"
    });
});
