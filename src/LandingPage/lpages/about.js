import React, { useEffect, useState } from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import BMCClogo from '../../userhome/assets/logo.jpg'
import BMCCmem from '../../userhome/assets/bmccmem.png'
import { Colorlist } from '../../Api/request'
import { motion } from "framer-motion";
import '../css/labout.css'
import LoadingCircle from '../LoadingScreen/skcircle'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { color } from "../../App";
import { CSSTransition } from 'react-transition-group';
import { Typography,Card,Paper } from '@mui/material'
const About = () => {
  const { colorlist } = useContext(color);
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);

  useEffect(() => {
    const delay = 1000;
    const timeoutId = setTimeout(() => {
      setShowMission(true);
      setShowVision(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
    {colorlist && <div>
    <LHeader/>
    <LNav/>
    <motion.div className='labout'
       initial="hidden"
       animate="visible"
       variants={textVariants}
       transition={{ duration: 1 }}>

      <div className="latitle">
        <img src={BMCClogo} alt="" />
        <h1>BATANG MARILENYO COORDINATING CENTER</h1>
      </div>
      <Card elevation={0} sx={{width:'100%',padding:'15px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
      <Typography sx={{fontSize:'20px'}}>
        Batang Marilenyo Coordinating Center will be the responsible agency in implementing the process of Application and in Coordination
        with the Municipal Treasurer Office on releasing of the Financial Assistance to the Scholars.
      </Typography>
      </Card>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      style={{display:'flex',width:'100%',justifyContent:'space-around',alignItems:'center',height:'250px'}}>
      <CSSTransition in={showMission} classNames="grow" timeout={1000} unmountOnExit>
        <Paper className="amvp" sx={{padding:'10px'}}>
          <Typography variant="h3">MISSION</Typography>
          <Typography>
            To provide and sustain a caring and protective environment for all the children of Marilao,
            efficiently utilizing all resources, and actively engaging all stakeholders.
          </Typography>
        </Paper>
      </CSSTransition>

      <CSSTransition in={showVision} classNames="grow" timeout={1000} unmountOnExit>
        <Paper className="amvp">
          <Typography variant="h3">VISION</Typography>
          <Typography>
            A community that actively provides care, development support, and protection to its most valued
            asset, the children.
          </Typography>
        </Paper>
      </CSSTransition>
    </motion.div>

      <div className="aabstract" style={{backgroundColor:colorlist.bgColor,color:colorlist.bgColor1}}>BMCC OFFICIALS</div>
      
      <div className="abmccmem">
          <img src={BMCCmem} alt="" />
      </div>
    </motion.div>
    </div>}{!colorlist && <>
    <div style={{width:'100vw',height:'100vh'}}>
      <LoopingRhombusesSpinner />
    </div>
    </>}
    </>
  )
}

export default About