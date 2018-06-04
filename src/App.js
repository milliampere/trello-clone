import React from 'react';
import icon from './assets/notes.png';
import './App.css';
import Boards from './components/Board';
import Lists from './components/List';
import firebase, { addBoard as pushBoardToFirebase, removeBoard as removeBoardFromFirebase, addList as addListToFirebase, addCard as pushCardToFirebase } from './firebase';

class App extends React.Component {
  state = {
    boards: [],
    lists: [],
    cards: [],
    showPage: 'boards',
    boardId: null,
  };

  componentDidMount() {

    //pushCardToFirebase('-LE6fMYQ3Qzg43_ukMWB', 'Testkort');

    firebase.database().ref('boards')
      .on('child_added', (snapshot) => {
        //Create board
        const board = {
          id: snapshot.key,
          name: snapshot.val().name,
          lists: snapshot.val().lists,
        }
        //Add to state
        const boards = [...this.state.boards, board];
        //Update state
        this.setState({boards});
      })

    firebase.database().ref('boards')
      .on('child_changed', (snapshot) => {
        //Copy the state
        const boards = [...this.state.boards];
        //Look for board
        const updatedBoards = boards.map(item => {
          if(item.id === snapshot.key){
            return {...item, name: snapshot.val().name, lists: snapshot.val().lists}  //object spread
          }else{
            return item;
          }
        })
        this.setState({
          boards: updatedBoards
        });
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
        //Create list
        const list = {
          id: snapshot.key,
          name: snapshot.val().name,
          boardId: snapshot.val().boardId,
          cards: snapshot.val().cards,
        }
        //Add to state
        const lists = [...this.state.lists, list];
        //Update state
        this.setState({lists});
      })

      firebase.database().ref('lists')
      .on('child_changed', (snapshot) => {
        //Copy the state
        const lists = [...this.state.lists];
        //Look for list
        const updatedLists = lists.map(item => {
          if(item.id === snapshot.key){
            return {...item, name: snapshot.val().name, cards: snapshot.val().cards}  //object spread
          }else{
            return item;
          }
        })
        this.setState({
          lists: updatedLists
        });
    })

      firebase.database().ref('lists')
      .on('child_removed', (snapshot) => {
        // Copy state
        const lists = [...this.state.lists];

        const listsWithoutRemoved = lists
          .filter((list) => {
            return (list.id !== snapshot.key) ? list : false;
          })

        //Update state
        this.setState({list: listsWithoutRemoved});
      })


      firebase.database().ref('cards')
      .on('child_added', (snapshot) => {
        //Create card
        const card = {
          id: snapshot.key,
          name: snapshot.val().name,
          listId: snapshot.val().listId,
        }
        //Add to state
        const cards = [...this.state.cards, card];
        //Update state
        this.setState({cards});
      })

      firebase.database().ref('cards')
      .on('child_changed', (snapshot) => {
        //Copy the state
        const cards = [...this.state.cards];
        //Look for board
        const updatedCards = cards.map(item => {
          if(item.id === snapshot.key){
            return {...item, name: snapshot.val().name, listId: snapshot.val().listId }  //object spread
          }else{
            return item;
          }
        })
        this.setState({
          cards: updatedCards
        });
    })

      firebase.database().ref('cards')
      .on('child_removed', (snapshot) => {
        // Copy state
        const cards = [...this.state.cards];

        const cardsWithoutRemoved = cards
          .filter((card) => {
            return (card.id !== snapshot.key) ? card : false;
          })

        //Update state
        this.setState({list: cardsWithoutRemoved});
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
          cards={this.state.cards}
        />
        }

      </div>
    );
  }
}

export default App;
