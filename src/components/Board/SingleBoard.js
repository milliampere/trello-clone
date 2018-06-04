import React from 'react';
import './style.css';

const SingleBoard = (props) => {
  const {name, id, openPortal, handleBoardClick} = props;
  return (
    <div className="single-board">
      <h2 className="single-board__heading" onClick={() => handleBoardClick(id)}>{name}</h2>
      <div className="single-board__button--remove" onClick={() => openPortal({id, name})}>X</div>
    </div>
  )
};

export default SingleBoard;
