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



export function addBoard(userId, name) {

  const board = {
    name
  };

  const newBoardKey = 'b' + firebase.database().ref().child('boards').push().key;

  var updates = {};
  updates['/boards/' + userId + '/' + newBoardKey] = board;
  return firebase.database().ref().update(updates);

}

export function removeBoard(userId, boardId) {

  var updates = {};
  updates[`/boards/${userId}/${boardId}`] = null;
  updates[`/lists/${userId}/${boardId}`] = null;
  updates[`/cards/${userId}/${boardId}`] = null;

  return firebase.database().ref().update(updates)
    .then(() => { console.log('Removed!') })
    .catch((error) => { console.log('Error pushing', error) });

}


export function addList(userId, boardId, name) {

  const list = {
    name
  };

  // Get a key for a new list
  const newListKey = 'l' + firebase.database().ref().child('lists2').push().key;

  // Write the new list's data simultaneously
  var updates = {};
  updates['/lists/' + userId + '/' + boardId + '/' + newListKey] = list;

  return firebase.database().ref().update(updates);

}

export function removeList(userId, boardId, listId) {

  var updates = {};
  updates['/lists/' + userId + '/' + boardId + '/' + listId] = null;
  updates['/cards/' + userId + '/' + boardId + '/' + listId] = null;

  return firebase.database().ref().update(updates)
    .then(() => { console.log('Removed!') })
    .catch((error) => { console.log('Error pushing', error) });

}

export function addCard(userId, boardId, listId, name) {

  const card = {
    name
  };

  // Get a key for a new list
  const newCardKey = 'c' + firebase.database().ref().child('cards2').push().key;

  // Write the new list's data simultaneously
  var updates = {};
  updates['/cards/' + userId + '/' +  boardId + '/' + listId + '/' + newCardKey] = card;

  return firebase.database().ref().update(updates);

}


export function removeCard(userId, boardId, listId, cardId) {

  var updates = {};
  updates['/cards2/' + userId + '/' + boardId + '/' + listId + '/' + cardId] = null;

  return firebase.database().ref().update(updates);

}


export function moveCard(extendedCard, newList) {

  const updatedCard = {
    name: extendedCard.card.name
  }

  const userId = extendedCard.user.uid;
  const boardId = extendedCard.board.id;
  const oldListId = extendedCard.list.id;
  const newListId = newList.id;
  const cardId = extendedCard.card.id;

  console.log('extended card', extendedCard);
  console.log('newlist', newList);

  // Write data simultaneously
  var updates = {};
  updates['/cards/' + userId + '/' +  boardId + '/' + oldListId + '/' + cardId] = null;
  updates['/cards/' + userId + '/' +  boardId + '/' + newListId + '/' + cardId] = updatedCard;

  return firebase.database().ref().update(updates);

}

