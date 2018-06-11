import React from 'react';
import ListUnit from './ListUnit';
import NewList from './NewList';
import Portal from '../ConfirmationModal/Portal';
import './style.css';
import firebase, {
  addList as addListToFirebase,
  removeList as removeListFromFirebase
  } from '../../firebase';

class Lists extends React.Component {

  state = {
    lists: [],
    showPortal: null,
  };

  componentDidMount() {
    console.log('list did mount');
    const uid = this.props.user.uid;
    const boardId = this.props.board.id;

    // Listening for added lists
    firebase.database().ref(`lists/${uid}/${boardId}`)
      .on('child_added', (snapshot) => {
        const newList = {
          id: snapshot.key,
          name: snapshot.val().name,
        }
        this.setState({lists: [...this.state.lists, newList]});
      })

    // Listening for removed lists
    firebase.database().ref(`lists/${uid}/${boardId}`)
    .on('child_removed', (snapshot) => {
      const listsWithoutRemoved = this.state.lists
        .filter((list) => {
          return (list.id !== snapshot.key) ? list : false;
        })
      this.setState({lists: listsWithoutRemoved});
    })
  }

  componentWillUnmount() {
    console.log('list will unmount');
    firebase.database().ref('lists').off();
  }

  render() {
    const {board, user, openPortal} = this.props;
    const {lists} = this.state;
    return (
      <div className="lists">
        <div className="lists__header">
          <h2 className="lists__header__heading">{board.name}</h2>
        </div>
        <div className="lists__content">
          {lists && lists.map((list) => <ListUnit
            list={list}
            board={board}
            key={list.id}
            cards={[]}
            user={user}
            showPortal={this.state.showPortal}
            openPortal={(id) =>
              this.setState({
                showPortal: id
              })
            }
          />)}

          <NewList
            board={board}
            addListToFirebase={addListToFirebase}
            user={user}
          />
        </div>

        <Portal
          open={this.state.showPortal}
          header="Confirm"
          handleClose={() =>
            this.setState({
              showPortal: null
            })
          }
          handleConfirm={() => {
            removeListFromFirebase(this.props.user.uid, this.props.board.id, this.state.showPortal.id);
            this.setState({
              showPortal: null,
            })
          }}
        >
          Are you sure you want to remove the list "{this.state.showPortal && this.state.showPortal.name}"?
        </Portal>
      </div>
    )
  }
};

export default Lists;



