import React from 'react';
import icon from './assets/notes.png';
import './App.css';
import Boards from './components/Board';
import Lists from './components/List';
import firebase, { addBoard as pushBoardToFirebase, removeBoard as removeBoardFromFirebase, addList as addListToFirebase } from './firebase';

class App extends React.Component {
  state = {
    boards: [],
    lists: [],
    showPage: 'boards',
    boardId: null,
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




      firebase.database().ref('lists')
      .on('child_added', (snapshot) => {
        //Create board
        const list = {
          id: snapshot.key,
          name: snapshot.val().name,
          boardId: snapshot.val().boardId,
        }
        //Add to state
        const lists = [...this.state.lists, list];
        //Update state
        this.setState({lists});
      })
  }


  handleBoardClick = (boardId) => {
    this.setState({showPage: 'list', boardId});
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header__heading">
            <img src={icon} className="app__header__logo" alt="logo" onClick={() => {this.setState({showPage: 'boards'})}} />
          </h1>
        </header>
        
        {this.state.showPage === 'boards' && 
        <Boards 
          boards={this.state.boards}
          pushBoardToFirebase={pushBoardToFirebase}
          removeBoardFromFirebase={removeBoardFromFirebase}
          handleBoardClick={this.handleBoardClick}
        />}

        {this.state.showPage === 'list' && 
        <Lists 
          addListToFirebase={addListToFirebase} 
          board={this.state.boards.filter((board) => this.state.boardId === board.id)[0]} 
          lists={this.state.lists.filter((list) => this.state.boardId === list.boardId)}
        />
        }

      </div>
    );
  }
}

export default App;
