import React from 'react';

const ListUnit = (props) => {
  const {list} = props;
  return (
    <div className="list-unit">
        <h3 className="list-unit__heading">{list.name}</h3>
        <input type="text" className="list-unit__input" />
        <span>cards</span>
    </div>
  );
};

export default ListUnit;
