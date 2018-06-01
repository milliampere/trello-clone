import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import NewBoard from './components/Board/NewBoard';
import firebase, { addBoard as pushBoardToFirebase, removeBoard as removeBoardFromFirebase } from './firebase';

class App extends React.Component {
  state = {
    boards: [],
    displayNewBoardForm: false,
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

  handleNewBoardToggle = (bool) => {
    this.setState({displayNewBoardForm: bool});
  } 

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header__heading">
            <img src={logo} className="app__header__logo" alt="logo" />
          </h1>
        </header>
        
        <div className="boards">
          <NewBoard display={this.state.displayNewBoardForm} displayForm={this.handleNewBoardToggle} addNewBoard={pushBoardToFirebase} />
          {this.state.boards.map((board) => {
            return <Board name={board.name} id={board.id} key={board.id} removeBoard={removeBoardFromFirebase} />
          })}
        </div>


      </div>
    );
  }
}

export default App;
