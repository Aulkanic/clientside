import React, { useEffect, useState } from 'react'
import '../css/lhomepage.css'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";
import CustomCarousel from '../../Components/Slider/customCarousel';
import { Image } from 'antd';
import { fetchImageFromProxy } from '../../helper/fetchImage';

function Lhomepage() {
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
  const content = () =>{
    const imgUrl = imgList[0]?.File;
      return (
       <div className="relative">
          <div className='w-full h-96'>
            <img className='w-full h-full object-cover' src={imgUrl} alt="" />
          </div>
        <div className="absolute top-0 left-0 w-full h-28 md:h-24 backdrop-blur-sm bg-white/30">

        </div>
        <div className="absolute top-4 left-10 md:left-1/3">
            <h1 className='font-bold text-2xl'>
              BATANG MARILENYO PROTEKTADO
            </h1>
            <p>Be part of our Scholarship Program</p>
        </div>
        <div className="absolute bottom-2 md:bottom-10 w-full flex justify-center items-center">
          <Link to='/ScholarshipProgram' 
                className='llinkapp'>
          <motion.button style={{backgroundColor:colorlist[0].bgColor,color:'white'}} whileHover={{
              scale: 1.2,
              transition: { duration: 0.5 },
            }}
          whileTap={{ scale: 0.9 }}>
          APPLY NOW
          </motion.button></Link>
        </div>
       </div>       

      )
  }
  return (
    <>
    {(colorlist && imgList) && !isLoading ? (
    <div className='flex flex-col justify-center items-center w-screen h-max'>
    <div className='flex bg-white h-1/2 flex-col w-full md:w-11/12'>
      {content()}
      <div className='flex flex-col md:flex-row my-4 h-1/2'>
          <div className='w-full md:w-1/2 bg-white leading-9 p-4 flex flex-col justify-center items-center'>
              <p className='font-bold'>What is Pondo Para sa Iskolar ng Bayan?</p>
              <p>
              The Iskolar ng bayan ng Marilao is an ordinance started by Juanito "Tito" Santiago as mayor of the Marilao from 2013-2019. 
              The scholarship program is written by Counselor Willie Diaz and was started in 2014.
               It aims to help working students focus on their academics without worrying about their finances, 
               and will give them more time to learn and have higher chances of having high-performing students in the marilao.
              </p>
          </div>
          <div className='w-full md:w-1/2 mb-4 '>
          <CustomCarousel images={imgList}/>
          </div>
      </div>
    </div>
    </div>)
    : (<>
      <div style={{width:'100vw',height:'100vh'}}>
        <LoopingRhombusesSpinner/>
      </div>
    </>)}
    </>
  )
}

export default Lhomepage