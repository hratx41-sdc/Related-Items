import React from 'react';
import Slider from 'react-slick';


export default class MultipleItems extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="slider">
        <h2>{this.props.title.toUpperCase()}</h2>
        <Slider {...settings}>
          {this.props.items}
        </Slider>
      </div>
    );
  }
}
