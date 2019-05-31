import React from 'react';
import Slider from 'react-slick';


export default class MultipleItems extends React.Component {
  constructor(props){
    super(props);
  };



  render() {

    function NextArrow(props) {
      const { className, style, onClick } = props;
      const url = 'http://fashovarelateditems-env.p3zuanqtmi.us-east-2.elasticbeanstalk.com/ArrowRight.png'
      return (
        <div
          className={className}
          style={{ ...style, content: `url('${url}')`, width: "30px", height: "40px"}}
          onClick={onClick}
        />
      );
    }
    
    function PrevArrow(props) {
      const { className, style, onClick } = props;
      const url = 'http://fashovarelateditems-env.p3zuanqtmi.us-east-2.elasticbeanstalk.com/ArrowLeft.png'
      return (
        <div
          className={className}
          style={{ ...style, content: `url('${url}')`, width: "30px", height: "40px"}}
          onClick={onClick}
        />
      );
    }

    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 200,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
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
