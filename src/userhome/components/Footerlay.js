import React from 'react'
import Location from './../assets/location.png'
import Contact from './../assets/contact.png'
import WWW from './../assets/www.png'
import './../css/footerlay.css'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';
import { Colorlist } from '../../Api/request'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from "react";
import { color } from "../../App";

const Footer = () => {
    const { colorlist,imgList } = useContext(color);

  return (
    <div>
        <div className='footer' style={{backgroundColor:colorlist[0].bgColor}}>
            <div className='copyr'>
                <p>Terms of Service</p>
            </div>
            <div className='location'>
                <PlaceIcon/><span>Tabing Ilog Marilao, Bulacan</span>
            </div>
            <div className='contact'>
                <LocalPhoneIcon /><span>0922343232</span>
            </div>
            <div className='url'>
                <LanguageIcon /><span>http://Marisko.com</span>
            </div>
        </div>
    </div>
  )
}

export default Footer