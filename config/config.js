app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "ProfileCtrl",
      templateUrl: "views/profile.html",
      resolve: {
        "currentAuth": ["UserAuth", function(UserAuth) {
          return UserAuth.checkAuth().$requireAuth();
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
    .when("/stream", {
      controller: "StreamCtrl",
      templateUrl: "views/stream.html",
      resolve: {
        "currentAuth": ["UserAuth", function(UserAuth) {
          return UserAuth.checkAuth().$requireAuth();
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
