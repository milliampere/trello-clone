import React from 'react';
import SingleCard from './SingleCard';
import NewCard from './NewCard';
import './style.css';
import Portal from '../ConfirmationModal/Portal';
import firebase, {
  addCard as addCardToFirebase,
  removeCard as removeCardFromFirebase,
  } from '../../firebase';

class Cards extends React.Component {

  state = {
    cards: [],
    showPortal: null,
  };

  // hack, avoid setState warnings on unmounted React components
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    console.log('cards did mount');
    const uid = this.props.user.uid;
    const boardId = this.props.board.id;
    const listId = this.props.list.id;

    // Set initial state
    firebase.database().ref(`cards/${uid}/${boardId}/${listId}`)
      .once('value').then((snapshot) => {
        const newCards = [];

        for(let key in snapshot.val()) {
          // skip loop if the property is from prototype
          if (!snapshot.val()[key]) continue;

          var obj = snapshot.val()[key];
          newCards.push({
            id: key,
            name: obj.name
          })
        }
        if(this._isMounted) {
          this.setState({cards: newCards});
        }
      }
    );

    // Listening for added lists
    firebase.database().ref(`cards/${uid}/${boardId}/${listId}`)
      .on('child_added', (snapshot) => {
        const newCard = {
          id: snapshot.key,
          name: snapshot.val().name,
        }
        if(this._isMounted) {
          this.setState({cards: [...this.state.cards, newCard]});
        }
      })

    // Listening for removed lists
    firebase.database().ref(`cards/${uid}/${boardId}/${listId}`)
    .on('child_removed', (snapshot) => {
      const cardsWithoutRemoved = this.state.cards
        .filter((card) => {
          return (card.id !== snapshot.key) ? card : false;
        })
      if(this._isMounted) {
        this.setState({cards: cardsWithoutRemoved});
      }
    })
  }

  componentWillUnmount() {
    console.log('cards will unmount');
    firebase.database().ref('cards').off();
    this._isMounted = false;
  }


  render(){
    const {onDragStart, list, board, user, openPortal} = this.props;
    const {cards} = this.state;
    return (
      <div className="cards">
        <NewCard
          user={user}
          list={list}
          board={board}
          addCardToFirebase={addCardToFirebase}
        />
        {cards.map((card) =>
          <SingleCard
            list={list}
            card={card}
            key={card.id}
            onDragStart={onDragStart}
            user={user}
            board={board}
            showPortal={this.state.showPortal}
            openPortal={(id) =>
              this.setState({
                showPortal: id
              })
            }
          />)}

          <Portal
            open={this.state.showPortal}
            header="Confirm"
            handleClose={() =>
              this.setState({
                showPortal: null
              })
            }
            handleConfirm={() => {
              removeCardFromFirebase(this.props.user.uid, this.state.showPortal.id);
              this.setState({
                showPortal: null,
              })
            }}
          >
            Are you sure you want to remove the card "{this.state.showPortal && this.state.showPortal.name}"?
        </Portal>

      </div>
    );
  }

};

export default Cards;
