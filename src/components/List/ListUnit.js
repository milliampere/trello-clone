import React from 'react';
import Cards from '../Card';
import { moveCard as moveCardInFirebase } from '../../firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ListUnit extends React.Component {

  onDragStart = (e, extendedCard, fromList) => {
    //e.preventDefault();
    e.dataTransfer.setData('text/plain', JSON.stringify(extendedCard))
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, toList) => {
    e.preventDefault();
    const extendedCard = JSON.parse(e.dataTransfer.getData('text'));

    moveCardInFirebase(extendedCard, toList);
    //console.log('ondrop', card.name, 'to: ', toList.name);
  }

  render(){
    const {list, board, openPortal, user} = this.props;
    return (
      <div className="list-unit">
          <h3 className="list-unit__heading">{list.name}</h3>
          <div className="list-unit__button--remove" onClick={() => openPortal({id: list.id, name: list.name})}>X</div>

          <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
            <Cards
              onDragStart={this.onDragStart}
              user={user}
              board={board}
              list={list}
            />
          </ReactCSSTransitionGroup>

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
