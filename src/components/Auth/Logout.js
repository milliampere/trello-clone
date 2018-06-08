import React from 'react';
import firebase from '../../firebase';

const logoutGoogle = () => {
  firebase.auth().signOut();
}

const Logout = (props) => {
  return (
    <button onClick={logoutGoogle}>Logout</button>
  );
};

export default Logout;
