import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCs-5ShaVvYS0mJ8ku1xjxnStg7vD-lbHo",
  authDomain: "trello-clone-bcc92.firebaseapp.com",
  databaseURL: "https://trello-clone-bcc92.firebaseio.com",
  projectId: "trello-clone-bcc92",
  storageBucket: "trello-clone-bcc92.appspot.com",
  messagingSenderId: "973085184625"
};
firebase.initializeApp(config);

export default firebase;


export function addBoard(name) {
  const boardsRef = firebase.database().ref('boards/');

  const board = {
    name,
    createdAt: new Date(),  // type date in firestore?
  };

  boardsRef.push(board)
    .then(() => { console.log('Pushed!') })
    .catch((error) => { console.log('Error pushing', error) });
}

export function removeBoard(key) {
  const boardRef = firebase.database().ref(`boards/${key}`);

  boardRef.remove()
    .then(() => { console.log('Removed!') })
    .catch((error) => { console.log('Error pushing', error) });
}
