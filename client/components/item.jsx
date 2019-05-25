import React from 'react';

const Item = (props) => (
    <div className="item-box">
        <img src={props.images[0]} width="325px"></img>
        <div className="item-info">
            <div className="item-details">{props.name}</div>
            <div className="item-price">${props.price} USD</div>
            <div className="add-to-bag">
            </div>
        </div>
    </div>
)

export default Item;