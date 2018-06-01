import React from 'react';

class NewBoard extends React.Component {
  state = {
    input: '',
  };

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = () => {
    this.props.addNewBoard(this.state.input);
    this.setState({input: ''});
    this.props.displayForm(false);
  }

  render() {
    const {display, displayForm} = this.props;
    return (
      <div className="new-board">
        <div className="new-board__header" onClick={() => displayForm(true)}>
          <h2>Create new board</h2>
        </div>
        { display && <div className="new-board__content">
          <label className="new-board__label">Choose a name for the board</label>
          <input type="text" value={this.state.input} onChange={this.handleChange} className="new-board__input" />
          <div>
            <button onClick={() => displayForm(false)}>Cancel</button>
            <button className="new-board__button--save" onClick={this.handleSubmit}>Save</button>
          </div>
        </div>
        }
      </div>  
    )
  }
}


export default NewBoard;