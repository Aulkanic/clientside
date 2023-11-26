import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const CustomPrevArrow = (props) => {
    return (
      <div
        {...props}
        className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-300 px-2 py-2 text-lg text-gray-800 left-4"
        style={{ left: '-10px', zIndex: 1 }}
      >
      <GrPrevious />
      </div>
    );
  };
  
  const CustomNextArrow = (props) => {
    return (
      <div
        {...props}
        className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-300 px-2 py-2 text-lg text-gray-800 right-4"
        style={{ right: '-10px', zIndex: 1 }}
      >
     <GrNext />
      </div>
    );
  };

const CustomSlider = ({ children, settings }) => {
    const customSettings = {
        ...settings,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
      };
  return (
    <Slider {...customSettings}>
      {React.Children.map(children, (child, index) => (
        <div key={index}>
            {child}
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
