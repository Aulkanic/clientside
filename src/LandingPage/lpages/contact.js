import React, { useState } from 'react'
import '../css/lcontact.css'
import { motion } from "framer-motion";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box,Link, Button, styled } from '@mui/material';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";
import CustomSlider from '../../Components/Slider/slider';
import CustomCarousel from '../../Components/Slider/customCarousel';
import MultiCarousel from '../../Components/Slider/multiCarousel';

const GreenButton = styled(Button)({
  backgroundColor: 'green',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
  width:'max-content'
});
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

function Contact() {

  const [loading,Setloading] = useState(false)
  const { imgList } = useContext(color);

  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
console.log(imgList)
  return (
    <>
    {!loading && 
    <div className='flex flex-col justify-center items-center w-screen h-max'>
    <div className='w-full flex justify-center items-center'>
      <div className="w-full md:w-11/12 flex flex-col bg-white">
        <div className='w-full flex flex-col flex-wrap p-4 md:p-0 md:flex-row mb-4 justify-center items-center'>
          <div className='w-1/2 flex flex-col gap-4'>
            <div className="w-full">
              <div className="flex flex-col">
                <h1>Marilao Youth Development Office</h1>
                <p>Office Address: 3/F Annex Bldg., Marilao Municipal Bldg, Patubig Marilao, Bulacan</p>
                <Link href="https://web.facebook.com/BatangMarilenyo">
                  <p>Facebook Page: https://web.facebook.com/BatangMarilenyo</p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h1>Connect with Us</h1>
              <p style={{marginBottom:'20px'}}>For inquiries regarding the Scholarhip Program,please send us a message to any of the following platforms</p>
              <div className='flex gap-4'>
              <GreenButton variant="contained" href="https://web.facebook.com/BatangMarilenyo">
                <FacebookSharpIcon/>
              </GreenButton>
              <GreenButton variant="contained" href="mailto:batangmarilenyooffice@gmail.com">
                <EmailSharpIcon sx={{ color: 'white' }}/>
              </GreenButton>
              </div>

            </div>
          </div>
          <div className='w-1/2 h-full pr-4 pt-2'>
              <CustomCarousel  images={imgList}/>
          </div>
        </div>
        <motion.div 
        className='w-full p-4'
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ duration: 1 }}>

            <motion.div className='w-full'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.9130242154506!2d120.95668217497754!3d14.773928885733268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b273fea7697b%3A0x602bd049e77e7c8a!2sMunicipality%20Of%20Marilao%20Bulacan!5e0!3m2!1sen!2sph!4v1687064264766!5m2!1sen!2sph" 
            className='w-full h-96'
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            </motion.div>
        </motion.div>
      </div>
    </div>
    </div>

    }{loading && <>
    <div style={{width:'100vw',height:'100vh'}}>
      <LoopingRhombusesSpinner />
    </div>
    </>}
    </>
  )
}

export default Contact