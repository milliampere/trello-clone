import React from 'react';
import Card from '../Card';
import { moveCard as moveCardInFirebase } from '../../firebase';


class ListUnit extends React.Component {

  onDragStart = (e, card, fromList) => {
    //e.preventDefault();
    console.log('dragstart', card.name, 'from: ', fromList.name);
    e.dataTransfer.setData('text/plain', JSON.stringify(card))
  }

  onDragOver = (e) => {
    e.preventDefault();
    //console.log('dragover');
  }

  onDrop = (e, toList) => {
    e.preventDefault();
    const card = JSON.parse(e.dataTransfer.getData('text'));
    moveCardInFirebase(toList.id, card);
    console.log('ondrop', card.name, 'to: ', toList.name);
  }

  render(){
    const {list, cards} = this.props;
    return (
      <div className="list-unit">
          <h3 className="list-unit__heading">{list.name}</h3>
          <input type="text" className="list-unit__input" />
          {cards.map((card) => <Card list={list} card={card} key={card.id} onDragStart={this.onDragStart} />)}

          <div
            className="droppable"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, list)}
          >
          </div>

      </div>
    );
  }
};

export default ListUnit;
