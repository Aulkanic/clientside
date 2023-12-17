import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function MultiCarousel({images}) {
    console.log(images)
  return (
<Carousel
  responsive={responsive}
>
    {images.map((data,index) =>{
        return(
        <div className='w-96 h-full p-4' key={index}>
          <img src={data.File} alt="" />
        </div>
    )})}
  </Carousel>
  )
}

export default MultiCarousel