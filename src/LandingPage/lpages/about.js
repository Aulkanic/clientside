import React, { useEffect, useState } from 'react'
import BMCClogo from '../../userhome/assets/logo.jpg'
import Member1 from '../../userhome/assets/mydo3.jpg'
import Member2 from '../../userhome/assets/mydo5.jpg'
import Member3 from '../../userhome/assets/mydo4.jpg'
import Member4 from '../../userhome/assets/mydo1.jpg'
import Member5 from '../../userhome/assets/mydo2.jpg'
import MYDO from '../../userhome/assets/mydo.png'
import { motion } from "framer-motion";
import '../css/labout.css'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading'
import { useContext } from "react";
import { Avatar } from '@mui/material'
import { color } from "../../App";
import { Typography,Card,Paper } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};



const About = () => {
  const { colorlist,logolist } = useContext(color);
  const {ref:ref1,inView:inView1} = useInView({
    threshold:0.2
  });
  const {ref:ref2,inView:inView2} = useInView({
    threshold:0.5
  });
  const {ref:ref3,inView:inView3} = useInView({
    threshold:0.5
  });

  const mission = {
    hidden: {
      x: '-50%', 
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  const vission = {
    hidden: {
      x: '50%', 
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const animation = useAnimation();
  useEffect(() => {
    if (inView1) {

      animation.start("visible");
    } else {
     
      animation.start("hidden");
    }
  }, [inView1, animation]);



  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };


  const BmccOfficial = [
    {profile:Member1,name:'Editha L. Ramos',job:'Community Affairs Officer III'},
    {profile:Member2,name:'Noriel Wency C. Correa',job:'Administrative Aide III'},
    {profile:Member3,name:'Joerene M. Martinez',job:'Administrative Aide III'},
    {profile:Member4,name:'Shaira Mae L. Usi',job:'Administrative Aide III'},
    {profile:Member5,name:'Aaron Jake M. Cadalin',job:'Administrative Aide III'},
  ]
  return (
    <>
    {colorlist && <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

    <motion.div className='labout'
       initial="hidden"
       animate="visible"
       variants={textVariants}
       transition={{ duration: 1 }}>

      <div className="latitle">
        <img src={MYDO} style={{widt:'100px',height:'70px',objectFit:'contain'}} alt="" />
        <h1 style={{fontWeight:'700'}}>Marilao Youth Development Office</h1>
      </div>
      <Card elevation={0} sx={{width:'100%',padding:'15px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Typography sx={{fontSize:'20px'}}>
      Marilao Youth Development Office will be the responsible agency in implementing the process of Application and in Coordination
        with the Municipal Treasurer Office on releasing of the Financial Assistance to the Scholars.
      </Typography>
      </Card>
      <div className='mvcontainer'>
        <div className='wrapper'>
        <motion.div className="amvp"
        ref={ref2}
        initial='hidden'
        animate={inView2 ? 'visible' : 'hidden'}
        variants={mission}
        transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" sx={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'25px',fontWeight:'700'}}>
            MISSION</Typography>
          <Typography>
            To provide and sustain a caring and protective environment for all the children of Marilao,
            efficiently utilizing all resources, and actively engaging all stakeholders.
          </Typography>
        </motion.div>
        <motion.div className="amvp"
        ref={ref3}
        initial='hidden'
        animate={inView3 ? 'visible' : 'hidden'}
        variants={vission}
        transition={{ duration: 0.5 }}        
        >
          <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'25px',fontWeight:'700'}}>
            VISION</Typography>
          <Typography>
            A community that actively provides care, development support, and protection to its most valued
            asset, the children.
          </Typography>
        </motion.div>
        </div>
      </div>
    <div ref={ref1} className='bmccofficials'>
      <div>
        <h1 className='mydoofficials'>MYDO OFFICIALS</h1>
      </div>
      <motion.div 
      className="abmccmem"
      initial="hidden"
      animate={inView1 ? "visible" : "hidden"}
      variants={container}
      >
          {BmccOfficial.map((data,index) =>{
            return(
              <motion.div key={index} className='cardprofile'
              variants={item}
              >
              <Card className='profileoffic' elevation={3} 
              sx={{
                display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'0px 0px 10px 0px',height:'max-Content',width:'190px',minHeight:'150px',border:'none',
                
                
                }}>
              <div className='backgroundimg' style={{backgroundImage:`url(${logolist[0].logo})`}}>
                <div className='circular' style={{padding:'5px',borderRadius:'50%',position:'relative'}}>
                <Avatar sx={{width:100,height:90}} alt="Remy Sharp" src={data.profile} size="lg" />
                </div>
              </div>
                <div style={{margin:'5px',textAlign:'center',height:'30px'}}>
                <h2 style={{fontSize:'12px',fontWeight:'600'}}>{data.name}</h2>
                <h2 style={{fontSize:'12px',fontWeight:'300'}}>{data.job}</h2>
                </div>

              </Card>
              </motion.div>
            )
          })}
      </motion.div>
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