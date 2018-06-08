
    //addBoard2('Bräda2');
    //addList2('b-LEUTtngJxzMU1zEVIlS', 'Lista2');
    //removeBoard2('b-LEUQEEYKEinSd_dEvVX');
    //addCard2('b-LEUTtngJxzMU1zEVIlS', 'l-LEUTzPq1rI3AnMg2IYV', 'Card2c');
    //removeCard2('b-LEUQEEYKEinSd_dEvVX', 'l-LEUQMoZN4lRb8_HHnQy', 'c-LEUQaonEAtOIeKvWqK3');

    firebase.database().ref('boards2')
      .on('child_added', (snapshot) => {
        //Create board
        const board = {
          id: snapshot.key,
          name: snapshot.val().name,
        }
        //Add to state
        const boards2 = [...this.state.boards2, board];
        //Update state
        this.setState({boards2});
      })

    firebase.database().ref('boards')
      .on('child_added', (snapshot) => {
        //Create board
        const board = {
          id: snapshot.key,
          name: snapshot.val().name,
          lists: snapshot.val().lists,
        }
        //Add to state
        const boards = [...this.state.boards, board];
        //Update state
        this.setState({boards});
      })

    firebase.database().ref('boards')
      .on('child_changed', (snapshot) => {
        //Copy the state
        const boards = [...this.state.boards];
        //Look for board
        const updatedBoards = boards.map(item => {
          if(item.id === snapshot.key){
            return {...item, name: snapshot.val().name, lists: snapshot.val().lists}  //object spread
          }else{
            return item;
          }
        })
        this.setState({
          boards: updatedBoards
        });
    })

    firebase.database().ref('boards')
      .on('child_removed', (snapshot) => {
        // Copy state
        const boards = [...this.state.boards];

        const boardsWithoutRemoved = boards
          .filter((board) => {
            return (board.id !== snapshot.key) ? board : false;
          })

        //Update state
        this.setState({boards: boardsWithoutRemoved});
      })



      firebase.database().ref('lists2')
      .on('child_added', (snapshot) => {
        //Create list
        const list = {
          boardId: snapshot.key,
          list: snapshot.val(),
        }
        //Add to state
        const lists2 = [...this.state.lists2, list];
        //Update state
        this.setState({lists2});
      })

      firebase.database().ref('lists')
      .on('child_added', (snapshot) => {
        //Create list
        const list = {
          id: snapshot.key,
          name: snapshot.val().name,
          boardId: snapshot.val().boardId,
          cards: snapshot.val().cards,
        }
        //Add to state
        const lists = [...this.state.lists, list];
        //Update state
        this.setState({lists});
      })

      firebase.database().ref('lists')
      .on('child_changed', (snapshot) => {
        //Copy the state
        const lists = [...this.state.lists];
        //Look for list
        const updatedLists = lists.map(item => {
          if(item.id === snapshot.key){
            return {...item, name: snapshot.val().name, cards: snapshot.val().cards}  //object spread
          }else{
            return item;
          }
        })
        this.setState({
          lists: updatedLists
        });
    })

      firebase.database().ref('lists')
      .on('child_removed', (snapshot) => {
        // Copy state
        const lists = [...this.state.lists];

        const listsWithoutRemoved = lists
          .filter((list) => {
            return (list.id !== snapshot.key) ? list : false;
          })

        //Update state
        this.setState({lists: listsWithoutRemoved});
      })


      firebase.database().ref('cards')
      .on('child_added', (snapshot) => {
        //Create card
        const card = {
          id: snapshot.key,
          name: snapshot.val().name,
          listId: snapshot.val().listId,
        }
        //Add to state
        const cards = [...this.state.cards, card];
        //Update state
        this.setState({cards});
      })

      firebase.database().ref('cards')
      .on('child_changed', (snapshot) => {
        //Copy the state
        const cards = [...this.state.cards];
        //Look for board
        const updatedCards = cards.map(item => {
          if(item.id === snapshot.key){
            return {...item, name: snapshot.val().name, listId: snapshot.val().listId }  //object spread
          }else{
            return item;
          }
        })
        this.setState({
          cards: updatedCards
        });
    })

      firebase.database().ref('cards')
      .on('child_removed', (snapshot) => {
        // Copy state
        const cards = [...this.state.cards];

        const cardsWithoutRemoved = cards
          .filter((card) => {
            return (card.id !== snapshot.key) ? card : false;
          })

        //Update state
        this.setState({list: cardsWithoutRemoved});
      })
