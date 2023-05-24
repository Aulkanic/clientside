import React from 'react'
import LHeader from '../components/header'
import LNav from '../components/navbar'
import { TextField } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FormControl from '@mui/base/FormControl';
import '../css/lcontact.css'
import Location from '../../userhome/assets/locationbmcc.png'
import Email from '../../userhome/assets/email.png'
import tele from '../../userhome/assets/tele.png'
import { motion } from "framer-motion";
function contact() {
  const textVariants = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0 }
  };
  return (
    <>
    <LHeader/>
    <LNav/>
    <motion.div className='lcontact'
           initial="hidden"
           animate="visible"
           variants={textVariants}
           transition={{ duration: 1 }}>
        <div className="lcntctcon">
          <div className="contfrm">
            <div><FormControl defaultValue="" required><TextField sx={{width: '90%'}} label='Name' margin='normal' variant='outlined' color='secondary'/></FormControl></div>
            <div><TextField sx={{width: '90%'}} label='Contact Number' margin='normal' variant='outlined' color='secondary'/></div>
            <div><TextField sx={{width: '90%'}} label='Email' margin='normal' variant='outlined' color='secondary'/></div>
            <div><TextField sx={{width: '90%'}} label='Subjects' margin='normal' variant='outlined' color='secondary'/></div>
            <div><TextareaAutosize   minRows={3}
            placeholder="Message"
               style={{ width: '90%' }}/></div>
             <button className='btnctnc'>Send</button>
          </div>
         
          <div className="cntctde">
            <div className="cntcthder">
            <h1>Contact Us</h1>
            <p>If you have any inquiry regarding the Scholarship Program,please do not<br/>hesitate to reach out to us.</p>
            </div>
              <div className="cntctinf">
                <div className="cntctcard">
                  <div className="iconctnct"><img src={Location} alt="" /><br /></div>
                  <div className="ctnctinf">
                    <p>3rd Floor, Municipal Hall, NLEX Northbound Exit Road, Brgy. Patubig, Marilao, Bulacan</p>
                  </div>
                </div>
                <div className="cntctcard">
                <div className="iconctnct"><img src={Email} alt="" /><br /></div>
                <div className="ctnctinf">
                    <p>mayor@marilao.gov.ph</p>
                  </div>
                </div>
                <div className="cntctcard">
                <div className="iconctnct"><img src={tele} alt="" /><br /></div>
                <div className="ctnctinf">
                    <p>919-8191 local 1120</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </motion.div>
    </>
  )
}

export default contact