import React from 'react';
import firebase from '../../firebase';

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

const Login = (props) => {
  return (
    <button onClick={loginInGoogle}>Login with Google</button>
  );
}

export default Login;
