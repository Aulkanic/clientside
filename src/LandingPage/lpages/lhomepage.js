import React from 'react'
import '../css/lhomepage.css'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { Card,Typography } from '@mui/material'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";
import CustomSlider from '../../Components/Slider/slider';

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
};

function Lhomepage() {
  const { colorlist,imgList } = useContext(color);

  const content = () =>{
    const imgUrl = imgList[0]?.File;
      return (
        <>
       <div className="lapply" style={{backgroundImage: `url(${imgUrl})`}}>
        <div className="lslogan">
            <h1>
              BATANG MARILENYO PROTEKTADO
            </h1>
            <p>Be part of our Scholarship Program</p>
        </div>
        <div className="lbtnapp">
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
        </>
      )
  }
  return (
    <>
    {colorlist && imgList ? (<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100vw'}}>
    <div className='flex flex-col w-11/12'>
    {content()}
      
        <div className='flex my-4 h-full'>
          <div className='w-1/2 bg-white leading-9 p-4 flex flex-col justify-center items-center'>
              <p className='font-bold'>What is Pondo Para sa Iskolar ng Bayan?</p>
              <p>
              The Iskolar ng bayan ng Marilao is an ordinance started by Juanito "Tito" Santiago as mayor of the Marilao from 2013-2019. 
              The scholarship program is written by Counselor Willie Diaz and was started in 2014.
               It aims to help working students focus on their academics without worrying about their finances, 
               and will give them more time to learn and have higher chances of having high-performing students in the marilao.
              </p>
          </div>
          <div className='w-1/2 mb-4 '>
          <CustomSlider settings={settings}>
            {imgList?.map((data, index) => {
              return(
              <div key={index} className='m-2'>
                <img className='w-full h-full' 
                src={data.File} alt=""/>
              </div>
            )})}
          </CustomSlider>
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