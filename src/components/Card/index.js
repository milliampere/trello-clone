import React from 'react';
import './style.css';

const Card = (props) => {
  const {onDragStart, list, card} = props;
  return (
    <div
      className="draggable"
      onDragStart={(e)=>onDragStart(e, card, list)}
      draggable="true"
    >{card.name}</div>
  );
};

export default Card;
