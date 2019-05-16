import React from 'react';
import ReactDOM from 'react-dom';

class RelatedObjects extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){

        return (
            <div id="related-objects-app">
                <h1>related-objects: Will's component</h1>
            </div>
        )
    }
};

ReactDOM.render(
    <RelatedObjects />,
    document.getElementById('related-items')
)