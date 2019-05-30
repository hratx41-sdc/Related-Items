import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from './components/slider.jsx';
import Item from './components/item.jsx';


// this will eventually be passed down through props.  Possible bug w/ mismatched cats.
// be sure to change appropriate var name for 'mens clothes'.


class RelatedItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUuid: 13,
            currentCat: this.currentUuid < 21 ? 'dresses'
                : this.currentUuid < 41 ? 'pants' 
                : this.currentUuid < 61 ? 'shirts'
                : this.currentUuid < 81 ? 'accessories' : 'mens',
            relatedItems: [],
            mensItems: [],
            randomItems: [],
        };
    }


    updateUuid(uuid) {
        const event = new CustomEvent('updateUuid', { detail: uuid });
        window.dispatchEvent(event);
    }

    fetchItems() {
        const relatedItems = axios.get(`http://fashovarelateditems-env.p3zuanqtmi.us-east-2.elasticbeanstalk.com/items/category/${this.state.currentCat}`);
        const mensItems = axios.get('http://fashovarelateditems-env.p3zuanqtmi.us-east-2.elasticbeanstalk.com/items/category/mens');
        const randomItems = axios.get('http://fashovarelateditems-env.p3zuanqtmi.us-east-2.elasticbeanstalk.com/items/random');

        Promise.all([relatedItems, mensItems, randomItems])
            .then((cats) => {
                this.setState({
                    relatedItems: cats[0].data,
                    mensItems: cats[1].data,
                    randomItems: cats[2].data,
                });
            })
            .catch(console.log);
    }

    componentDidMount() {
        window.addEventListener('updateUuid', (e) => {
            this.setState({
                currentUuid: e.detail,
                currentCat: e.detail < 21 ? 'dresses'
                : e.detail < 41 ? 'pants' 
                : e.detail < 61 ? 'shirts'
                : e.detail < 81 ? 'accessories' : 'mens',
            });
        });
    }
    
    componentWillMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentCat !== this.state.currentCat) {
            this.fetchItems();
        }
    }
    
    render(){

        // Input: Item Array from State & Header Title
        // Output: Slider w/ given Items and Title
        const createSlider = (array, title) => {
            const itemsArray = array.map((item) => {
                return <Item name={item.name} 
                            images={item.images} 
                            price={item.price} 
                            key={item.uuid}
                            uuid={item.uuid}
                            sizing={item.sizing}
                            updateUuid={this.updateUuid}
                        />
            });
            return <Slider items={itemsArray} title={title}/>;
        }

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
    }
};

ReactDOM.render(
    <RelatedItems />,
    document.getElementById('related-items')
);
