app.factory("Post", function($rootScope, $firebaseArray, $firebaseObject) {
  function Post() {
  }

  Post.composePost = function(newPost) {
      var postRef = $rootScope.fbRef.child("posts");
      var postArray = $firebaseArray(postRef);
      console.log(newPost);
      postArray.$add({
        content: newPost,
        dateCreated: Firebase.ServerValue.TIMESTAMP,
        postComposerUserName: $rootScope.currentUser.username,
        postComposerId: $rootScope.userToken.uid,
        postComposerFullName: $rootScope.currentUser.fullName,
        postComposerGravatar: $rootScope.currentUser.gravatar,
        favorites: null,
        retweets: null,
        hashtags: null,
        userMentions: null
      });
  };
  Post.showCurrentUserPosts = function() {
    if ($rootScope.userToken) {
      var postRef = $rootScope.fbRef.child("posts");
      var query = postRef.orderByChild("postComposerId").equalTo($rootScope.userToken.uid);
      return $firebaseArray(query);
    }
  };

  return Post;
});
