import React from 'react'
import '../css/lhomepage.css'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { Card,Typography } from '@mui/material'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className='lconthome'>
    {content()}
      
        <div className="lcarou" style={{width:'100%'}}>
          <div className='definescho'>
            <Card sx={{padding:'10px'}}>
              <Typography sx={{fontSize:'25px'}}>What is Pondo Para sa Iskolar ng Bayan?</Typography>
              <Typography sx={{fontSize:'20px'}}>
              The Iskolar ng bayan ng Marilao is an ordinance started by Juanito "Tito" Santiago as mayor of the Marilao from 2013-2019. 
              The scholarship program is written by Counselor Willie Diaz and was started in 2014.
               It aims to help working students focus on their academics without worrying about their finances, 
               and will give them more time to learn and have higher chances of having high-performing students in the marilao.
              </Typography>
            </Card>
          </div>
          <Carousel>
      <Carousel.Item style={{width:'100%'}}>
        <img
          className="d-block w-100 carousel-image"
          src={imgList[1].File}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={imgList[3].File}
          alt="Second slide"
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={imgList[2].File}
          alt="Third slide"
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
          </Carousel>
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