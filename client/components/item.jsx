import React from 'react';

const sizes = {
    mensPants: ['30', '32', '34', '36', '38', '40', '42'],
    womensPants: ['00', '0', '1', '3', '5', '7', '9', '11', '13', '15', '1X', '2X', '3X'],
    shirts: ['S', 'M', 'L', 'XL', '2X', '3X'],
    dresses: ['S', 'M', 'L', 'XL', '2X', '3X'],
    oneSize: [],
};

const Item = (props) => {

    function updateUuid () {
        props.updateUuid(props.uuid);
        window.location = '#';
    }

    function addToBag (size) {
        props.addToBag(props.uuid, size);
        window.location = '#';
    }

    function addAccessoryToBag(id) {
        if (id > 60 && id < 81) {
            props.addToBag(id, "OS");
            window.location = '#'
        }
    }

    return (
        <div className="item-box">
            <img src={props.images[0]} onClick={updateUuid}></img>
            <div className="item-info"> 
                <div className="item-details">{props.name}</div>
                <div className="item-price">${props.price} USD</div>
                <div className="add-to-bag">
                    <div className="text">ADD TO BAG</div>
                    <select
                    id={props.uuid}
                    onChange={(e) => addToBag(e.target.value)}
                    onClick={(e) => addAccessoryToBag(e.target.id)}>
                        {sizes[props.sizing].map((size) => {
                            return <option>{size}</option>;
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Item;