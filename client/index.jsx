import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from './components/slider.jsx';
import Item from './components/item.jsx';


class RelatedItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
        };
    }
    
    
    componentDidMount() {
        let url = `/items/category/shirts`;
        axios.get(url)
            .then((items) => this.setState({items: items.data}))
            .catch(console.log)
    }
    
    render(){
        if(this.state.items.length > 0){
            const itemsArray = this.state.items.map((item) => {
                return <Item name={item.name} images={item.images} price={item.price} key={item.uuid}/>
            });
            const slider = <Slider items={itemsArray} />
            return (
                <>
                <div id='related-items-app'>
                    {slider}
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