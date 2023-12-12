import React, { useState } from 'react';
import { Carousel } from 'flowbite';

function CarouselImg({ img }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? img.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === img.length - 1 ? 0 : prevIndex + 1));
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='border-2 border-black'>
      <div className="relative w-full">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {img?.map((data, index) => (
            <div
              key={index}
              className={`${
                index === activeIndex ? 'block' : 'hidden'
              } duration-200 ease-linear`}
            
            >
              <img
                src={data.picture}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          ))}
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
          {img.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === activeIndex
                  ? 'bg-white dark:bg-gray-800'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
              }`}
              aria-current={index === activeIndex}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          {/* ... Previous button content */}
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          {/* ... Next button content */}
        </button>
      </div>
    </div>
  );
}

export default CarouselImg;
