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
import { Carousel } from 'react-responsive-carousel';
import { Card,Typography } from '@mui/material'
import LoadingCircle from '../LoadingScreen/skcircle'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";

function Lhomepage() {
  const { colorlist,imgList } = useContext(color);
  const [loadingScreen,setLoadingScreen] = useState(false)

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
          <motion.button whileHover={{
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
  const imagelist = imgList?.map((image, index) => {

    return (
    <div key={index} className="carousel-slide">
      <img style={{width: '100%',height:'300px'}} src={image.File} alt={`Carousel Image ${index}`} />
    </div>
    )
})
  return (
    <>
    {colorlist && imgList ? (<div>
    <LHeader/>
    <LNav/>
    <div className='lconthome'>
    {content()}
      <div className='lhr'> </div>
      
        <div className="lcarou" style={{width:'100%'}}>
          <div style={{width:'47%',margin:'0px 10px 0px 0px'}}>
            <Card sx={{padding:'10px'}}>
              <Typography sx={{fontSize:'30px'}}>What is Pondo Para sa Iskolar ng Bayan</Typography>
              <Typography sx={{fontSize:'20px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc. Aliquet porttitor lacus luctus accumsan. Nulla aliquet enim tortor at. Semper risus in hendrerit gravida rutrum. Phasellus egestas tellus rutrum tellus pellentesque. Condimentum id venenatis a condimentum vitae sapien. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Ac felis donec et odio pellentesque. Urna id volutpat lacus laoreet. Platea dictumst vestibulum rhoncus est.
              </Typography>
            </Card>
          </div>
        <Carousel
            className='Carou'
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