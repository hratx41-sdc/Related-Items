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
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <h2> Multiple items </h2>
        <Slider {...settings} className="slider">
          {this.props.items}
        </Slider>
      </div>
    );
  }
}
