import React from 'react';
import ListUnit from './ListUnit';
import NewList from './NewList';
import './style.css';

class Lists extends React.Component {

  state = {
  };

  render() {
    const {board, addListToFirebase, lists} = this.props;
    return (
      <div className="lists">
        <div className="lists__header">
          <h2 className="lists__header__heading">{board.name}</h2>
        </div>
        <div className="lists__content">
          {lists.map((list) => <ListUnit list={list} />)}
          <NewList board={board} addListToFirebase={addListToFirebase}>Add new list</NewList>
        </div>
      </div>
    )
  }
};

export default Lists;



