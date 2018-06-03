import React from 'react';
import logo from './logo.svg';
import './App.css';
import Boards from './components/Board';
import firebase, { addBoard as pushBoardToFirebase, removeBoard as removeBoardFromFirebase } from './firebase';

class App extends React.Component {
  state = {
    boards: []
  };

  componentDidMount() {
    firebase.database().ref('boards')
      .on('child_added', (snapshot) => {
        //Create board
        const board = {
          id: snapshot.key,
          name: snapshot.val().name
        }
        //Add to state
        const boards = [...this.state.boards, board];
        //Update state
        this.setState({boards});
      })

    firebase.database().ref('boards')
      .on('child_removed', (snapshot) => {
        // Copy state
        const boards = [...this.state.boards];

        const boardsWithoutRemoved = boards
          .filter((board) => {
            return (board.id !== snapshot.key) ? board : false;  
          })

        //Update state
        this.setState({boards: boardsWithoutRemoved});
      })
  }


  toggleModal = (handleConfirm) => {
    this.setState({
      showPortal: !this.state.showPortal
    })
    handleConfirm();
  }

  removeBoard = (key) => {
    this.setState({
      showPortal: true,
    })

    /* confirm ? removeBoardFromFirebase() : null; */
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header__heading">
            <img src={logo} className="app__header__logo" alt="logo" />
          </h1>
        </header>
        
        <Boards 
          boards={this.state.boards}
          pushBoardToFirebase={pushBoardToFirebase}
          removeBoardFromFirebase={removeBoardFromFirebase}
        />

      </div>
    );
  }
}

export default App;
