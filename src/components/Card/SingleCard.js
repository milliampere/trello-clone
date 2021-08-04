import React from 'react';
import './style.css';

const SingleCard = (props) => {
  const {onDragStart, list, card, board, user, openPortal} = props;
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
      <div className="card__button--checkbox"><input type="checkbox"></input></div>
      <span>{card.name}</span>
      <div className="card__button--remove" onClick={() => openPortal({id: card.id, name: card.name})}>X</div>
    </div>
  );
};

export default SingleCard;
