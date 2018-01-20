$(document).ready(function() {

  //Initailize Firebase
  var config = {
    apiKey: "AIzaSyCK6_akMjy07IekkbM6Mvq7nX9n1bMJIpY",
    authDomain: "vacayproject-c7e75.firebaseapp.com",
    databaseURL: "https://vacayproject-c7e75.firebaseio.com",
    projectId: "vacayproject-c7e75",
    storageBucket: "vacayproject-c7e75.appspot.com",
    messagingSenderId: "127370399579"
  };

  firebase.initializeApp(config);

  /////////// FireBase authentication

  /// trying the Firebase UI for sign in
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>'
};

  ui.start('#firebaseui-auth-container', uiConfig);

})
