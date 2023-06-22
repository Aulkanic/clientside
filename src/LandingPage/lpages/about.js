import React from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import BMCClogo from '../../userhome/assets/logo.jpg'
import BMCCmem from '../../userhome/assets/bmccmem.png'
import { motion } from "framer-motion";
import '../css/labout.css'
const about = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
  return (
    <>
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

      <div className="amv">
        <div className="amvp">
            <h1>MISSION</h1>
            <p>To provide and sustain a caring and protective environment for 
              all the children of Marilao, efficiently utilizing all resources,
               and actively engaging all stakeholders. </p>
        </div>

        <div className="amvp">
        <h1>VISION</h1>
            <p>A community that actively provides care,
               development support, and protection to its most valued asset, the children.  </p>
        </div>
      </div>

      <div className="aabstract">BMCC OFFICIALS</div>
      
      <div className="abmccmem">
          <img src={BMCCmem} alt="" />
      </div>
    </motion.div>
    </>
  )
}

export default about