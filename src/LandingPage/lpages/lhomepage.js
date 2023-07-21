import React from 'react'
import '../css/lhomepage.css'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import {Link} from 'react-router-dom'
import limgda from '../../userhome/assets/da.jpg'
import { motion } from "framer-motion";
import { WebImg } from '../../Api/request'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card,Typography } from '@mui/material'
import LoadingCircle from '../LoadingScreen/skcircle'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';
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
            <motion.h1
             initial={{ opacity: 0 }}
             animate={{ opacity: 1,fontSize:1600 }}
             transition={{ delay: 0.5 }} >
              BATANG MARILENYO PROTEKTADO
              </motion.h1>
            <p>Be part of our Scholarship Program</p>
        </div>
        <div className="lbtnapp">
          <Link to='/ScholarshipProgram' 
                className='llinkapp'>
          <motion.button style={{backgroundColor:colorlist[0].bgColor,color:colorlist[0].bgColor1}} whileHover={{
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
    {colorlist && imgList ? (<div style={{display:'flex',flexDirection:'column'}}>
    <LNav/>
    <div className='lconthome'>
    {content()}
      
        <div className="lcarou" style={{width:'100%'}}>
          <div style={{width:'47%',margin:'0px 10px 0px 0px'}}>
            <Card sx={{padding:'10px'}}>
              <Typography sx={{fontSize:'30px'}}>What is Pondo Para sa Iskolar ng Bayan</Typography>
              <Typography sx={{fontSize:'20px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc. Aliquet porttitor lacus luctus accumsan. Nulla aliquet enim tortor at. Semper risus in hendrerit gravida rutrum. Phasellus egestas tellus rutrum tellus pellentesque. Condimentum id venenatis a condimentum vitae sapien. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Ac felis donec et odio pellentesque. Urna id volutpat lacus laoreet. Platea dictumst vestibulum rhoncus est.
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
    <div className="lfooter" style={{backgroundColor:colorlist[0].bgColor1}}>
    <div>
        <div style={{display:'flex',width:'100%',justifyContent:'space-around',alignItems:'center',height:'100px'}}>
            <div className='copyr'>
                <p>Terms of Service</p>
            </div>
            <div className='location'>
                <PlaceIcon/><span>Tabing Ilog Marilao, Bulacan</span>
            </div>
            <div className='contact'>
                <LocalPhoneIcon /><span>{colorlist[0].telephone}</span>
            </div>
            <div className='url'>
                <LanguageIcon /><span>http://Marisko.com</span>
            </div>
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