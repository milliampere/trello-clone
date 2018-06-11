import React from 'react';

class NewBoard extends React.Component {
  state = {
    input: '',
  };

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = () => {
    console.log(this.props.user.uid);
    this.props.addNewBoard(this.props.user.uid, this.state.input);
    this.setState({input: ''});
    this.props.openForm(false);
  }

  render() {
    const {open, openForm} = this.props;
    return (
      <div className={open ? "new-board" : "new-board new-board--closed"}>
        <div className="new-board__header" onClick={() => openForm(true)}>
          <h2 className="new-board__header__heading">Create new board</h2>
        </div>
        { open && <div className="new-board__content">
          <label className="new-board__label">Choose a name for the board</label>
          <input type="text" value={this.state.input} onChange={this.handleChange} className="new-board__input" />
          <div className="new-board__footer">
            <button className="new-board__footer__button--close" onClick={() => openForm(false)}>Cancel</button>
            <button className="new-board__footer__button--save" onClick={this.handleSubmit}>Save</button>
          </div>
        </div>
        }
      </div>
    )
  }
}


export default NewBoard;
