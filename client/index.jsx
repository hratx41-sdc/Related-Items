import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from './components/slider.jsx';
import Item from './components/item.jsx';
const currentCat = 'accessories';  
// this will eventually be passed down through props.  Possible bug w/ mismatched cats.
// be sure to change appropriate var name for 'mens clothes'.


class RelatedItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            relatedItems: [],
            mensItems: [],
        };
    }
    
    
    componentDidMount() {
        const relatedItems = axios.get(`/items/category/${currentCat}`);
        const mensItems = axios.get('/items/category/mens');
        Promise.all([relatedItems, mensItems])
            .then((cats) => {
                console.log(cats);
                this.setState({
                    relatedItems: cats[0].data,
                    mensItems: cats[1].data,
            });
        })
    }
    
    render(){
        if(this.state.relatedItems.length > 0){
            const relatedItemsArray = this.state.relatedItems.map((item) => {
                return <Item name={item.name} images={item.images} price={item.price} key={item.uuid}/>
            });
            const slider = <Slider items={relatedItemsArray} title={'More Cute Stuff'}/>
            const mensItemsArray = this.state.mensItems.map((item) => {
                return <Item name={item.name} images={item.images} price={item.price} key={item.uuid}/>
            });
            const slider2 = <Slider items={mensItemsArray} title={'Shop For Your Man'}/>
            return (
                <>
                <div id='related-items-app'>
                    {slider}
                    {slider2}
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