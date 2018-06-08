import React from 'react';
import './style.css';

const Card = (props) => {
  const {onDragStart, list, card} = props;
  return (
    <div
      className="card draggable"
      onDragStart={(e)=>onDragStart(e, card, list)}
      draggable="true"
    >
      <span>{card.name}</span>
      <div className="card__button--remove">X</div>
    </div>
  );
};

export default Card;
