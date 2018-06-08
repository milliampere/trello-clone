import React from 'react';

class NewList extends React.Component {
  state = {
    input: '',
    open: false
  }

  onEnter = (e) => {
    if(e.key === 'Enter') {
      console.log('hej');
      this.props.addListToFirebase(this.props.board.id, this.state.input);
      setTimeout(() => this.setState({input: '', open: false}), 500);
    }
  }

  render(){
    const {addListToFirebase, board} = this.props;
    return (
      <div className="new-list">
        <span onClick={() => this.setState({open: !this.state.open})} className="new-list__header">Add new list...</span>
        {this.state.open &&
        <input type="text"
          onChange={(e) => this.setState({input: e.target.value})}
          value={this.state.input}
          onKeyPress={this.onEnter}
          className="new-list__input" />
        }
      </div>
    );
  }
};

export default NewList;
