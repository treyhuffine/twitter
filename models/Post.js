app.factory("Post", function($rootScope, $firebaseArray, $firebaseObject) {
  function Post() {
  }
  // Post.setRef = function() {
  //   var postRef = $rootScope.fbReb.child("Posts");
  //   return postArray = $firebaseArray(postRef);
  // };
  Post.composePost = function(newPost) {
      var postRef = $rootScope.fbRef.child("posts");
      var postArray = $firebaseArray(postRef);
      console.log(newPost);
      postArray.$add({
        content: newPost,
        dateCreated: Firebase.ServerValue.TIMESTAMP,
        postComposerName: $rootScope.currentUser.username,
        postComposerId: $rootScope.userToken.uid,
        favorites: null,
        retweets: null,
        hashtags: null,
        userMentions: null
      });
  };
  Post.showCurrentUserPosts = function() {
    var postRef = $rootScope.fbRef.child("posts");
    var query = postRef.orderByChild("postComposerId").equalTo($rootScope.userToken.uid);
    console.log(postRef);
    console.log(query);
    console.log($firebaseArray(postRef));
    return $firebaseArray(query);
  };

  return Post;
});
