import React from 'react';
import './style.css';

const SingleCard = (props) => {
  const {onDragStart, list, card, board, user} = props;
  const extendedCard = {
    board,
    list,
    user,
    card
  };
  return (
    <div
      className="card draggable"
      onDragStart={(e)=>onDragStart(e, extendedCard, list)}
      draggable="true"
    >
      <span>{card.name}</span>
      <div className="card__button--remove">X</div>
    </div>
  );
};

export default SingleCard;
