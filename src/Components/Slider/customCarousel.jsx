import React, { useState,useEffect } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MYDO from '../../Images/mydo.png'
import { Image } from 'antd';
import { fetchImageFromProxy } from '../../helper/fetchImage';

function CustomCarousel({images, showDots = true, autoplay, autoplayInterval = 3000 }) {
  const [imageSrc, setImageSrc] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(0);

    const goToNextSlide = () =>{
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    const goToPrevSilde = () =>{
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }
  const isAtFirstIndex = currentIndex === 0;
  const isAtLastIndex = currentIndex === images.length - 1;
  useEffect(() => {
    const fetchImage = async () => {
      if (images[currentIndex]) {
        const src = await fetchImageFromProxy(images[currentIndex].File || images[currentIndex].picture);
        setImageSrc(src);
      }
    };
    fetchImage();
  }, [currentIndex, images]);


  useEffect(() => {
    let intervalId;

    if (autoplay) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoplayInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoplay, autoplayInterval, images.length]);

  return (
    <div className='flex w-full relative h-96 bg-gray-200 hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
        <button className='absolute left-2 top-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 py-1 flex justify-center items-center rounded-full'
        onClick={goToPrevSilde}
        disabled={isAtFirstIndex}
        >
        <ArrowLeftIcon className='text-white text-lg'/>
        </button>
        <Image
            src={imageSrc || MYDO}
            alt={`Slide ${currentIndex}`}
            className="transition-opacity duration-500 ease-in-out w-full"
            loading='lazy'
            style={{ opacity: 1 }}
        />
        {images[currentIndex].title && <p className='absolute bottom-12 left-2 md:left-24 w-11/12 md:w-5/6 truncate rounded-md bg-white p-2'>{images[currentIndex].title}</p>}
        <button className='absolute right-2 top-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 py-1 flex justify-center items-center rounded-full'
        onClick={goToNextSlide}
        disabled={isAtLastIndex}
        >
         <ArrowRightIcon className='text-white text-lg'/>
        </button>
        {showDots && (
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 bg-blue-500 rounded-full cursor-pointer ${
                index === currentIndex ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomCarousel