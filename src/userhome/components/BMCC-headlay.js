import React from 'react'
import BMCC from './../assets/logo.jpg'
import '../css/Bmcc-header.css'
import marilao from './../assets/marilao.jpg'
import mayor from './../assets/hl.png'
import Avatar from '@mui/material/Avatar';
const header = () => {
  return (
    <div className='Header'>
      <div className='BMCC'>
        <div className='bmcc'>
        <Avatar alt="" src={BMCC} sx={{width: 60, height: 60}} />
        </div>
      
        <div>
        <p className='title'>MARISKO</p>
      </div>
      </div>
    
      <div className='LINK'>
        <div className='marilao'>
        <Avatar alt="" src={marilao} sx={{width: 60, height: 60}} />
        </div>
    <div className='mayor'>
         <Avatar alt="" src={mayor} sx={{width: 60, height: 60}} />
    </div>
    
  
      </div>
    </div>
    
  )
}

export default header