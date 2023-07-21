import React from 'react'
import BMCC from './../assets/logo.jpg'
import '../css/Bmcc-header.css'
import marilao from './../assets/marilao.jpg'
import mayor from './../assets/hl.png'
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { color } from "../../App";
import LoopingRhombusesSpinner from '../loadingDesign/loading'
const Header = () => {
  const { colorlist,imgList,logolist } = useContext(color);

  return (
    <>
    {logolist ? (<div className='Header'>
      <div className='BMCC'>
        <div className='bmcc'>
        <Avatar alt="" src={logolist[0].logo} sx={{width: 60, height: 60}} />
        </div>
      
        <div>
        <p className='title' style={{color:colorlist[0].bgColor}}>MARISKO</p>
      </div>
      </div>
    
      <div className='LINK'>
        <div className='marilao'>
        <Avatar alt="" src={marilao} sx={{width: 60, height: 60}} />
        </div>
    <div className='mayor'>
         <Avatar alt="" src={logolist[1].logo} sx={{width: 60, height: 60}} />
    </div>
    
  
      </div>
    </div>) : (
      <>
      <div style={{width:'100vw',height:'100vh'}}>
        <LoopingRhombusesSpinner/>
      </div>
    </>
    )}
    </>
  )
}

export default Header