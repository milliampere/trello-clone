import React from 'react';
import NewBoard from './NewBoard';
import SingleBoard from './SingleBoard';
import Portal from '../ConfirmationModal/Portal';
import './style.css';

class Boards extends React.Component {

  state = {
    showNewBoard: false,
    showPortal: null,
  };

  render() {
    const {boards, pushBoardToFirebase, removeBoardFromFirebase } = this.props;
    return (
      <div className="boards">
        <NewBoard 
          open={this.state.showNewBoard} 
          openForm={(bool) => 
            this.setState({showNewBoard: bool})
          } 
          addNewBoard={pushBoardToFirebase} 
        />

        { 
          boards.map((board) => {
            return <SingleBoard 
              name={board.name} 
              id={board.id} 
              key={board.id} 
              showPortal={this.state.showPortal}
              openPortal={(id) => 
                this.setState({
                  showPortal: id
                })
              }
            />
          })
        }

        <Portal
          open={this.state.showPortal}
          header="Confirm"
          handleClose={() =>
            this.setState({
              showPortal: null
            })
          }
          handleConfirm={() => {
            removeBoardFromFirebase(this.state.showPortal.id);
            this.setState({
              showPortal: null,
            })
          }}
        >
          Are you sure you want to remove the board "{this.state.showPortal && this.state.showPortal.name}"?
        </Portal>

      </div>
    )
  }
};



export default Boards;



