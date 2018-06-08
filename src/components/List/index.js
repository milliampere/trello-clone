import React from 'react';
import ListUnit from './ListUnit';
import NewList from './NewList';
import Portal from '../ConfirmationModal/Portal';
import './style.css';

class Lists extends React.Component {

  state = {
    showPortal: null,
  };

  render() {
    const {board, addListToFirebase, lists, cards, removeListFromFirebase, openPortal} = this.props;
    return (
      <div className="lists">
        <div className="lists__header">
          <h2 className="lists__header__heading">{board.name}</h2>
        </div>
        <div className="lists__content">
          {lists.map((list) => <ListUnit
            list={list}
            key={list.id}
            cards={cards.filter((card) => list.id === card.listId)}
            cardsAll={cards}
            showPortal={this.state.showPortal}
            openPortal={(id) =>
              this.setState({
                showPortal: id
              })
            }
          />)}

          <NewList
            board={board}
            addListToFirebase={addListToFirebase}
          />
        </div>

        <Portal
          open={this.state.showPortal}
          header="Confirm"
          handleClose={() =>
            this.setState({
              showPortal: null
            })
          }
          handleConfirm={() => {
            removeListFromFirebase(this.state.showPortal.id);
            this.setState({
              showPortal: null,
            })
          }}
        >
          Are you sure you want to remove the list "{this.state.showPortal && this.state.showPortal.name}"?
        </Portal>
      </div>
    )
  }
};

export default Lists;



