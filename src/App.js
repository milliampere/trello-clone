import React from 'react';
import icon from './assets/notes.png';
import './App.css';
import Boards from './components/Board';
import Lists from './components/List';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import firebase, {
  addBoard as addBoardToFirebase,
  removeBoard as removeBoardFromFirebase,
  addList as addListToFirebase,
  removeList as removeListFromFirebase,
  addCard as addCardToFirebase,
  removeCard as removeCardFromFirebase,
  } from './firebase';

class App extends React.Component {
  state = {
    boards: [],
    showPage: 'boards',
    boardId: null,
    user: null
  };

  componentDidMount() {

    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(this.onUserChange);

  }

  onUserChange = (user) => {
    if (user) {
      // User is signed in.
      const userData = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      }
      this.listenForChanges(user.uid);
      this.setState({user: userData});
    } else {
      // User is signed out.
      this.detachListeners();
      this.setState({user: null, boards: []});
    }
  }

  listenForChanges = (uid) => {
    console.log('listen for changes');
    // Listening for added boards
    firebase.database().ref('boards/' + uid)
      .on('child_added', (snapshot) => {
        const newBoard = {
          id: snapshot.key,
          name: snapshot.val().name,
        }
        this.setState({boards: [...this.state.boards, newBoard]});
      })

    // Listening for removed boards
    firebase.database().ref('boards/' + uid)
      .on('child_removed', (snapshot) => {
        const boardsWithoutRemoved = this.state.boards
          .filter((board) => {
            return (board.id !== snapshot.key) ? board : false;
          })
        this.setState({boards: boardsWithoutRemoved});
      })
  }

  detachListeners = () => {
    console.log('detach listeners');
    firebase.database().ref('boards').off();
  }

  handleBoardClick = (boardId) => {
    this.setState({showPage: 'list', boardId});
  }

  render() {
    const {user} = this.state;
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header__heading">
            <img src={icon} className="app__header__logo" alt="logo" onClick={() => {this.setState({showPage: 'boards'})}} />
          </h1>
        </header>

        <main>
          {!user && <Login />}
          {user && <Logout />}
        </main>

        {user && this.state.showPage === 'boards' &&
          <Boards
            user={this.state.user}
            boards={this.state.boards}
            addBoardToFirebase={addBoardToFirebase}
            removeBoardFromFirebase={removeBoardFromFirebase}
            handleBoardClick={this.handleBoardClick}
          />
        }

        {this.state.showPage === 'list' &&
          <Lists
            board={this.state.boards.filter((board) => this.state.boardId === board.id)[0]}
            //lists={this.state.lists.filter((list) => this.state.boardId === list.boardId)}
            //cards={this.state.cards}
            user={user}
          />
        }

      </div>
    );
  }
}

export default App;
