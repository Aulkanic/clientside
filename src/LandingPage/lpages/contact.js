import React, { useState,useEffect } from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import '../css/lcontact.css'
import { motion } from "framer-motion";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Card, CardContent, Typography, Link, Button, styled } from '@mui/material';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';

const GreenButton = styled(Button)({
  backgroundColor: 'green',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});
function Contact() {

  const images = [
    'https://drive.google.com/uc?id=1scIY0erYiuFBBXdLCF1_mYBnyOA0c1Nh',
    'https://drive.google.com/uc?id=1bkdJFYPWz6RQEZ-RKNa8dn0-IdB-YkSI',
    'https://drive.google.com/uc?id=1bkdJFYPWz6RQEZ-RKNa8dn0-IdB-YkSI',
  ];
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
const imagelist = images.map((image, index) => {

  return (
  <div key={index} className="carousel-slide">
    <img style={{width: '100%'}} src={image} alt={`Carousel Image ${index}`} />
  </div>
  )
  })
  return (
    <>
    <LHeader/>
    <LNav/>
    <div className="containcont">
    <div className='carocon'>
    <Carousel className='carousel'
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            transitionTime={1000}
            swipeable={true}
    >
      {imagelist}
    </Carousel>
    </div>
    <div className="hrhead">CONTACT US</div>
    <motion.div className='lcontact'
           initial="hidden"
           animate="visible"
           variants={textVariants}
           transition={{ duration: 1 }}>
        <div className="lcntctcon">
          <div className="cntctde">
            <Box display="flex" justifyContent="center">
            <div className="cntcthder">
            <h1>Batang Marilenyo Coordinating Center</h1>
            <p>Office Address: 3/F Annex Bldg., Marilao Municipal Bldg, Patubig Marilao, Bulacan</p>
            <Link href="https://web.facebook.com/BatangMarilenyo"><p>Facebook Page: https://web.facebook.com/BatangMarilenyo</p></Link>
            </div>
            </Box>
          </div>
        </div>
          <motion.div className='maploc'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.9130242154506!2d120.95668217497754!3d14.773928885733268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b273fea7697b%3A0x602bd049e77e7c8a!2sMunicipality%20Of%20Marilao%20Bulacan!5e0!3m2!1sen!2sph!4v1687064264766!5m2!1sen!2sph" 
          width="600" 
          height="450" 
          style={{ border: '0'}} 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
          </iframe>
          </motion.div>
        <div className="logcontac">
          <h1>Connect with Us</h1>
          <p>For inquiries regarding the Scholarhip Program,please send us a message to any of the following platforms</p>
          <GreenButton variant="contained" href="https://web.facebook.com/BatangMarilenyo">
            <FacebookSharpIcon/>
          </GreenButton>
          <GreenButton sx={{marginLeft: '10px'}} variant="contained" href="mailto:batangmarilenyooffice@gmail.com">
            <EmailSharpIcon sx={{ color: 'white' }}/>
          </GreenButton>
        </div>
    </motion.div>
    </div>
    </>
  )
}

export default Contact