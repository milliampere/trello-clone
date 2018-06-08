import React from 'react';
import icon from './assets/notes.png';
import './App.css';
 import Boards from './components/Board';
//import Lists from './components/List';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import firebase, {
  addBoard2 as pushBoardToFirebase,
  removeBoard2 as removeBoardFromFirebase,
  addList as addListToFirebase,
  removeList as removeListFromFirebase,
  addCard as pushCardToFirebase,
  } from './firebase';

class App extends React.Component {
  state = {
    boards: [],
    boards2: [],
    lists: [],
    lists2: [],
    cards: [],
    cards2: [],
    showPage: 'boards',
    boardId: null,
    user: null
  };

  componentDidMount() {

    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(this.onUserChange);

    // Listening for added boards
    firebase.database().ref('boards2')
      .on('child_added', (snapshot) => {
        const newBoard = {
          id: snapshot.key,
          name: snapshot.val().name,
        }
        this.setState({boards2: [...this.state.boards2, newBoard]});
      })

    // Listening for removed boards
    firebase.database().ref('boards2')
      .on('child_removed', (snapshot) => {
        const boardsWithoutRemoved = this.state.boards2
          .filter((board) => {
            return (board.id !== snapshot.key) ? board : false;
          })
        this.setState({boards2: boardsWithoutRemoved});
      })

  }

  onUserChange = (user) => {
    if (user) {
      // User is signed in.
      const userData = {
        displayName: user.displayName,
        email: user.email
      }
      this.setState({user: userData});
    } else {
      // User is signed out.
      this.setState({user: null});
    }
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
            boards={this.state.boards2}
            handleBoardClick={() => {}}
            pushBoardToFirebase={pushBoardToFirebase}
            removeBoardFromFirebase={removeBoardFromFirebase}
            //handleBoardClick={this.handleBoardClick}
          />
        }


{/*         {this.state.showPage === 'list' &&
          <Lists
            addListToFirebase={addListToFirebase}
            removeListFromFirebase={removeListFromFirebase}
            board={this.state.boards.filter((board) => this.state.boardId === board.id)[0]}
            lists={this.state.lists.filter((list) => this.state.boardId === list.boardId)}
            cards={this.state.cards}
          />
        }  */}

      </div>
    );
  }
}

export default App;
