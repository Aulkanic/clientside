import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './style.css'
import 'swiper/css/effect-cards'
import { EffectCards } from 'swiper/modules';
import { useContext } from "react";
import {color} from '../../../App'
import { fetchImageFromProxy } from '../../../helper/fetchImage';

export const Home = () => {
  const { colorlist,imgList } = useContext(color);
  const [imgUrl, setImgUrl] = useState(null); 
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true)
      
      if (imgList && imgList.length > 0) {
        const imgUrl = await fetchImageFromProxy(imgList[0]?.File); // Fetch image URL
        setImgUrl(imgUrl);
      }
      setIsLoading(false)
    };
    fetchImage();
  }, [imgList]);
  console.log(imgUrl)
  return (
    <div className='w-screen h-max p-12 pt-24'>
      <div className=' flex flex-col justify-center items-start gap-12'>
        <div className='w-full text-center'>
        <p className='text-6xl text-[#16006D] font-bold'>Municipal youth development office</p>
        </div>

        <div className='w-[93%] flex flex-wrap justify-between pr-2'>
          <div className='w-[602px] text-2xl'>
            <p>Marilao Youth Development Office will be the responsible agency in implementing the process
               of Application and in Coordination with the Municipal Treasurer Office on releasing of the 
               Financial Assistance to the Scholars.
            </p>
          </div>
          <div className='w-max'>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide><img className='h-full object-fill' src={imgUrl} alt="" /></SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}
