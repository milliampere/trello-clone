import React from 'react';
//import firebase from '../../firebase';
import firebase, {
  addBoard as addBoardToFirebase,
  addList as addListToFirebase
} from '../../firebase';

const loginInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  // Init signin
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('logged in', user);
    }).catch((error) => {
      console.error(error);
  });
}

const loginAnonymously = () => {
  firebase.auth().signInAnonymously()
  .then((result) => {
    addBoardToFirebase(result.user.uid, 'Test board')
    .then( key => {
      addListToFirebase(result.user.uid, key, 'Test list');
  }, console.log);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

const Login = (props) => {
  return (<div>
    <button onClick={loginInGoogle}>Login with Google</button> <span>or </span>
    <button onClick={loginAnonymously}>Simply try out the app</button>
  </div>);
}

export default Login;
