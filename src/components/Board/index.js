import React from 'react';
import './style.css';

const Board = (props) => {
  const {name, id, removeBoard } = props;
  return (
    <div className="board">
      <h2 className="board__heading">{name}</h2>
      <div className="board__button--remove" onClick={() => removeBoard(id)}>X</div>
    </div>
  )
};

export default Board;