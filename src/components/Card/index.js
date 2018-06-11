import React from 'react';
import SingleCard from './SingleCard';
import NewCard from './NewCard';
import './style.css';
import firebase, {
  addCard as addCardToFirebase,
  removeCard as removeCardFromFirebase,
  } from '../../firebase';

class Cards extends React.Component {

  state = {
    cards: [],
    showPortal: null,
  };

  componentDidMount() {
    console.log('cards did mount');
    const uid = this.props.user.uid;
    const boardId = this.props.board.id;
    const listId = this.props.list.id;

    // Listening for added lists
    firebase.database().ref(`cards/${uid}/${boardId}/${listId}`)
      .on('child_added', (snapshot) => {
        const newCard = {
          id: snapshot.key,
          name: snapshot.val().name,
        }
        this.setState({cards: [...this.state.cards, newCard]});
      })

    // Listening for removed lists
    firebase.database().ref(`cards/${uid}/${boardId}/${listId}`)
    .on('child_removed', (snapshot) => {
      const cardsWithoutRemoved = this.state.cards
        .filter((card) => {
          return (card.id !== snapshot.key) ? card : false;
        })
      this.setState({cards: cardsWithoutRemoved});
    })
  }

  componentWillUnmount() {
    console.log('cards will unmount');
    firebase.database().ref('cards').off();
  }


  render(){
    const {onDragStart, list, board, user} = this.props;
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
          />)}
      </div>
    );
  }

};

export default Cards;
