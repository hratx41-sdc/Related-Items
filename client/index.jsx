import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from './components/slider.jsx';
import Item from './components/item.jsx';
const currentUuid = 95;  
// this will eventually be passed down through props.  Possible bug w/ mismatched cats.
// be sure to change appropriate var name for 'mens clothes'.


class RelatedItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentCat: currentUuid < 21 ? 'dresses'
                : currentUuid < 41 ? 'pants' 
                : currentUuid < 61 ? 'shirts'
                : currentUuid < 81 ? 'accessories' : 'mens',
            relatedItems: [],
            mensItems: [],
            randomItems: [],
        };
    }
    
    
    componentDidMount() {
        const relatedItems = axios.get(`/items/category/${this.state.currentCat}`);
        const mensItems = axios.get('/items/category/mens');
        const randomItems = axios.get('/items/random');

        Promise.all([relatedItems, mensItems, randomItems])
            .then((cats) => {
                this.setState({
                    relatedItems: cats[0].data,
                    mensItems: cats[1].data,
                    randomItems: cats[2].data,
            });
        })
    }


    
    render(){

        // Input: Item Array from State & Header Title
        // Output: Slider w/ given Items and Title
        const createSlider = (array, title) => {
            const itemsArray = array.map((item) => {
                console.log(item);
                return <Item name={item.name} images={item.images} price={item.price} key={item.uuid} sizing={item.sizing}/>
            });
            return <Slider items={itemsArray} title={title}/>;
        }

        if(this.state.relatedItems.length > 0){

            let relatedItemsTitle = this.state.currentCat === 'mens' ? 'More Good Stuff' : 'More Cute Stuff';

            const relatedItems = createSlider(this.state.relatedItems, relatedItemsTitle);
            const mensItems = this.state.currentCat === 'mens' ? [] : createSlider(this.state.mensItems, 'Shop For Your Man');
            const randomItems = createSlider(this.state.randomItems, 'Recomended For You');

            return (
                <>
                <div id='related-items-app'>
                    {relatedItems}
                    {mensItems}
                    {randomItems}
                </div>
                </>
            )
        } else {
            return (
                <>
                <div id='related-items-app'>
                </div>
                </>
            )
        }
    }
};




ReactDOM.render(
    <RelatedItems />,
    document.getElementById('related-items')
)