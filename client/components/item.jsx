import React from 'react';

const Item = (props) => (
    <div className="item-box">
        <img src={props.images[0]} width="325px"></img>
        <p width="325px" height="140px">{props.name}</p>
        <p width="325px" height="100px">${props.price}</p>
        <button>Add to Bag</button>
    </div>
)

export default Item;