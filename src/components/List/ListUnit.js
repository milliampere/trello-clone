import React from 'react';

const ListUnit = (props) => {
    const {list} = props;
    return (
        <div>
            {list.name}
        </div>
    );
};

export default ListUnit;