import React from 'react';
import './style.css';

class NewCard extends React.Component {
  state = {
    input: ''
  }

  onEnter = (e) => {
    if(e.key === 'Enter') {
      this.props.addCardToFirebase(this.props.user.uid, this.props.board.id, this.props.list.id, this.state.input);
      setTimeout(() => this.setState({input: ''}), 500);
    }
  }

  render(){
    return (
      <div className="new-card">
        <input
          type="text"
          onChange={(e) => this.setState({input: e.target.value})}
          value={this.state.input}
          onKeyPress={this.onEnter}
          className="new-card__input"
        />
      </div>
    );
  }
};

export default NewCard;
