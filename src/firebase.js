import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
    name
  };

  boardsRef.push(board)
    .then(() => { console.log('Pushed!') })
    .catch((error) => { console.log('Error pushing', error) });
}

export function addBoard2(name) {

  const board = {
    name
  };

  const newBoardKey = 'b' + firebase.database().ref().child('boards2').push().key;

  var updates = {};
  updates['/boards2/' + newBoardKey] = board;
  return firebase.database().ref().update(updates);

}

export function removeBoard(key) {
  const boardRef = firebase.database().ref(`boards/${key}`);

  var updates = {};
  updates['/boards/' + key] = null;

  boardRef.once('value').then(function(snapshot) {

    // Remove associated lists
    for (const listId in snapshot.val().lists) {
      updates['/lists/' + listId] = null;
    }

    // Remove associated cards
    for (const cardId in snapshot.val().cards) {
      updates['/cards/' + cardId] = null;
    }

    console.log(updates);

  });

  return firebase.database().ref().update(updates);

}

export function removeBoard2(boardId) {

  var updates = {};
  updates['/boards2/' + boardId] = null;
  updates['/lists2/' + boardId] = null;
  updates['/cards2/' + boardId] = null;

  return firebase.database().ref().update(updates);

}

export function addList(boardId, name) {

  const list = {
    name,
    boardId,
  };

  // Get a key for a new list
  const newListKey = firebase.database().ref().child('lists').push().key;

  // Write the new list's data simultaneously
  var updates = {};
  updates['/lists/' + newListKey] = list;
  updates['/boards/' + boardId + '/lists/' + newListKey ] = true;

  return firebase.database().ref().update(updates);

}

export function addList2(boardId, name) {

  const list = {
    name
  };

  // Get a key for a new list
  const newListKey = 'l' + firebase.database().ref().child('lists2').push().key;

  // Write the new list's data simultaneously
  var updates = {};
  updates['/lists2/' + boardId + '/' + newListKey] = list;

  return firebase.database().ref().update(updates);

}

export function removeList(key) {
  const listRef = firebase.database().ref(`lists/${key}`);

  listRef.remove()
    .then(() => { console.log('Removed!') })
    .catch((error) => { console.log('Error pushing', error) });
}

export function removeList2(boardId, listId) {

  var updates = {};
  updates['/lists2/' + boardId + '/' + listId] = null;
  updates['/cards2/' + boardId + '/' + listId] = null;

  return firebase.database().ref().update(updates);

}

export function addCard(boardId, listId, name) {

  const card = {
    name,
    listId,
  };

  // Get a key for a new card
  const newCardKey = firebase.database().ref().child('cards').push().key;

  // Write the new cards's data simultaneously
  var updates = {};
  updates['/cards/' + newCardKey] = card;
  updates['/lists/' + listId + '/cards/' + newCardKey ] = true;
  updates['/boards/' + boardId + '/cards/' + newCardKey ] = true;

  return firebase.database().ref().update(updates);

}


export function addCard2(boardId, listId, name) {

  const card = {
    name
  };

  // Get a key for a new list
  const newCardKey = 'c' + firebase.database().ref().child('cards2').push().key;

  // Write the new list's data simultaneously
  var updates = {};
  updates['/cards2/' + boardId + '/' + listId + '/' + newCardKey] = card;

  return firebase.database().ref().update(updates);

}


export function removeCard2(boardId, listId, cardId) {

  var updates = {};
  updates['/cards2/' + boardId + '/' + listId + '/' + cardId] = null;

  return firebase.database().ref().update(updates);

}


export function moveCard(listId, card) {

  const updatedCard = {
    listId: listId,
    name: card.name
  }

  // Write the new list's data simultaneously
  var updates = {};
  updates['/cards/' + card.id] = updatedCard;
  updates['/lists/' + listId + '/cards/' + card.id ] = true;
  updates['/lists/' + card.listId + '/cards/' + card.id ] = false;  //how to remove?

  return firebase.database().ref().update(updates);

}
