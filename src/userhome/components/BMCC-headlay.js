import React from 'react'
import '../css/Bmcc-header.css'
import marilao from './../assets/marilao.jpg'
import Bmcc from './../assets/logo.jpg'
import Avatar from '@mui/material/Avatar';
import { Image } from 'antd';
import { useContext } from "react";
import { color } from "../../App";
import LoopingRhombusesSpinner from '../loadingDesign/loading'
const Header = () => {
  const { colorlist,logolist } = useContext(color);
console.log(logolist)
  return (
    <>
    {logolist ? (<div className='Header'>
      <div className='BMCC'>
        <div className='bmcc'>
        <Image alt="" src={logolist[0].logo} sx={{width: 60, height: 60}} />
        </div>
      
        <div>
        <p className='title' style={{color:colorlist[0].bgColor}}>MARISKO</p>
      </div>
      </div>
    
      <div className='LINK'>
        <div className='marilao'>
        <Avatar alt="" src={Bmcc} sx={{width: 60, height: 60}} />
        </div>
        <div className='marilao'>
        <Avatar alt="" src={marilao} sx={{width: 60, height: 60,margin:'0px 5px 0px 5px'}} />
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