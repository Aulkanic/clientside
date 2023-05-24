import React from 'react'
import '../css/lhomepage.css'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import {Link} from 'react-router-dom'
import limgda from '../../userhome/assets/da.jpg'
import { motion } from "framer-motion";

function lhomepage() {
  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
    
  };
  
  return (
    <>
    <LHeader/>
    <LNav/>
    <div className='lconthome'>
      <div className="lapply">
        <div className="lslogan">
            <motion.h1
             initial={{ opacity: 0 }}
             animate={{ opacity: 1,fontSize:1600 }}
             transition={{ delay: 0.5 }} 

            >BATANG MARILENYO PROTEKTADO</motion.h1>
            <p>Be part of our Scholarship Program</p>
        </div>
        <div className="lbtnapp">
          <Link to='/ScholarshipProgram' className='llinkapp'><motion.button whileHover={{
    scale: 1.2,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 0.9 }}>APPLY NOW</motion.button></Link>
        </div>
      </div>
      <div className='lhr'></div>
      <div className="lcarou">
      <motion.div 
           initial={{ x: -1000 }} // Initial position outside the viewport
           animate={{ x: 0 }} // Animate to position 0 (left)
           transition={{ duration: 0.5 }} // Animation duration
          className="limgcard">
              <img src={limgda} alt="" />
          </motion.div>
          <motion.div 
           initial={{ x: -1000 }} // Initial position outside the viewport
           animate={{ x: 0 }} // Animate to position 0 (left)
           transition={{ duration: 0.5 }} // Animation duration
          className="limgcard">
              <img src={limgda} alt="" />
          </motion.div>
          <motion.div 
           initial={{ x: -1000 }} // Initial position outside the viewport
           animate={{ x: 0 }} // Animate to position 0 (left)
           transition={{ duration: 0.5 }} // Animation duration
          className="limgcard">
              <img src={limgda} alt="" />
          </motion.div>
      </div>
    </div>
    </>
  )
}

export default lhomepage